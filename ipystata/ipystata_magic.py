from __future__ import print_function
from IPython.core.magic import (Magics, magics_class, line_magic,
                                cell_magic, line_cell_magic, needs_local_scope)
from IPython.core.magic_arguments import (argument, magic_arguments,
    parse_argstring)

from IPython.core import display

from IPython.utils.path import get_ipython_cache_dir

from time import sleep

import ConfigParser
import pandas as pd
import sys
import subprocess
import os
import re

class iPyStata:
    def __init__(self):
        self._config_dir = os.path.join(get_ipython_cache_dir(), 'stata', 'config')
        self._config_file = os.path.join(self._config_dir, 'configuration.ini')

        self.Config = ConfigParser.ConfigParser()
        self.Config.read(self._config_file)

        if not os.path.exists(self._config_dir):
            os.makedirs(self._config_dir)
        if not os.path.isfile(self._config_file):
            with open(self._config_file, 'w') as configfile:
                self.Config.add_section('Stata configuration')
                self.Config.set('Stata configuration','installation',"C:\Program Files (x86)\Stata13\StataMP-64.exe")
                self.Config.write(configfile)

    def ConfigSectionMap(self, section):
        dict1 = {}
        options = self.Config.options(section)
        for option in options:
            try:
                dict1[option] = self.Config.get(section, option)
                if dict1[option] == -1:
                    DebugPrint("skip: %s" % option)
            except:
                print("exception on %s!" % option)
                dict1[option] = None
        return dict1

    def config_stata(self, stata):
        self.Config.set('Stata configuration', 'Installation', r'%s' % stata)
        with open(self._config_file, 'w') as configfile:
            self.Config.write(configfile)
        self.Config.read(self._config_file)

    def process_log(self, log):
        with open(log) as f:
            code = f.read()
        code = re.sub("\\n\. ..*?\\n", "\n", code)
        code = re.sub("\\n\.\s\\n", "\n", code)
        code = re.sub("(\\n)\\1{2,}", "\n\n", code)
        code = re.sub('\s*name: *.*?\\n', "\n", code)
        code = re.sub('\s*log: *.*?\\n', "\n", code)
        code = re.sub('\s*log type: *.*?\\n', "\n", code)
        code = re.sub('\s*opened on: *.*?\\n', "\n", code)
        code = re.sub('\s*closed on: *.*?\\n', "\n", code)
        code = re.sub('^-*\\n', "", code)
        code = re.sub('-*\\n$', "", code)
        return code

iPyStata = iPyStata()

@magics_class
class iPyStataMagic(Magics):

    def __init__(self, shell):
        super(iPyStataMagic, self).__init__(shell)
        self._lib_dir = os.path.join(get_ipython_cache_dir(), 'stata')
        if not os.path.exists(self._lib_dir):
            os.makedirs(self._lib_dir)

    @magic_arguments()

    @argument('-i', '--input', action='append', help='This is an input argument.')
    @argument('-d', '--data', help='This is the data input argument.')
    @argument('-o', '--output', help='This is the output argument.')
    @argument('-np', '--noprint', action='store_true', default=False, help='Force the magic to not return an output.')
    @argument('-os', '--openstata', action='store_true', default=False, help='Open Stata.')

    @needs_local_scope
    @cell_magic
    def stata(self, line, cell, local_ns=None):

        old_cwd = os.getcwdu() if sys.version_info[0] == 2 else os.getcwd()
        os.chdir(self._lib_dir)

        def stata_list(l):
            return ' '.join(l)

        args = parse_argstring(self.stata, line)

        if local_ns is None:
            local_ns = {}

        stata_lists = []
        name_list = []

        if args.input:
            for input in ','.join(args.input).split(','):
                try:
                    val = local_ns[input]
                except KeyError:
                    try:
                        val = self.shell.user_ns[input]
                    except KeyError:
                        raise NameError("name '%s' is not defined" % input)
                if isinstance(val, list):
                    stata_lists.append(stata_list(val))
                    name_list.append(input)
                else:
                    pass

        if args.data:
            data = args.data
            try:
                val = local_ns[data]
            except KeyError:
                try:
                    val = self.shell.user_ns[data]
                except KeyError:
                    raise NameError("name '%s' is not defined" % data)
            if isinstance(val, pd.DataFrame):
                val = val.reset_index()
                date_var = []
                for x in val.columns.values:
                    if val[x].dtype == "datetime64[ns]":
                        date_var.append(x)
                    else:
                        pass
                if date_var:
                    val.to_stata(r'data_input.dta', convert_dates= {x:'tc' for x in date_var}, write_index=False)
                else:
                    val.to_stata(r'data_input.dta', write_index=False)
            else:
                pass

        stata = iPyStata.ConfigSectionMap("Stata configuration")['installation']
        tmp_path='.'

        with open("code.do", "w") as myfile:
            myfile.write("clear" + "\n" + "set more off"+ "\n" + 'set linesize 200' + "\n")
            for x,y in zip(name_list, stata_lists):
                myfile.write("local "+ x + ' ' + y + "\n")
            if args.data:
                myfile.write(r'use "data_input.dta"'+"\n")
            myfile.write('log using log_output, replace text' + '\n')
            myfile.write('quietly cd "%s"'% old_cwd + '\n')
            myfile.write(cell)
            myfile.write('\n' + 'quietly cd "%s"' % self._lib_dir + '\n')
            myfile.write('\n' + 'log close' + '\n')
            if args.output:
                myfile.write(r'saveold "data_output.dta", replace ' + '\n')
            myfile.write("\n" + "// End of line deletion prevention")

        if args.openstata:
            cmd = [stata, "do", 'code.do']
        else:
            cmd = [stata, '/e', "do", 'code.do']

        try:
            p = subprocess.Popen(cmd)
            p.communicate()
        except:
            return "Failed to open Stata"

        sleep(1)
        out = iPyStata.process_log('log_output.log')

        if args.output:
            try:
                output_ipys = pd.read_stata(r'data_output.dta')
                try:
                    output_ipys.drop('index', axis=1, inplace=True)
                    self.shell.push({args.output: output_ipys })
                except:
                    self.shell.push({args.output: output_ipys })
            except:
                print("Exception has occured. File could not be loaded.")

        os.chdir(old_cwd)

        if not args.noprint:
            return print(out)
        else:
            return

# Register the magic function:
ip = get_ipython()
ip.register_magics(iPyStataMagic)

# Enable the stata syntax highlighting:
js = "IPython.CodeCell.config_defaults.highlight_modes['magic_stata'] = {'reg':[/^%%stata/]};"
display.display_javascript(js, raw=True)
