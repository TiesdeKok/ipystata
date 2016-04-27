from __future__ import print_function

from . import config

import platform
mac_os = platform.system() == 'Darwin'
windows_os = platform.system() == 'Windows'


import sys
py3 = sys.version_info > (3,)

from IPython.core.magic import (Magics, magics_class, line_magic,
                                cell_magic, line_cell_magic, needs_local_scope)
from IPython.core.magic_arguments import (argument, magic_arguments,
    parse_argstring)
from IPython.core import display
from IPython.display import Image
from IPython.display import IFrame

from IPython import version_info
if version_info[0] < 4:
    from IPython.utils.path import get_ipython_cache_dir
else:
    from IPython.paths import get_ipython_cache_dir

import time
import pandas as pd
import sys
import subprocess
import os
import re
import atexit

class iPyStata:

    def __init__(self):
        self.tornado_dir = os.getcwd()
        stata_dir = os.path.join(get_ipython_cache_dir(), 'stata')
        print('IPyStata is loaded in batch mode.')  

    def process_log(self, log):
        with open(log, 'r+') as log_file:
            code = log_file.read()
            code = re.sub('^-*\\n', "", code)
            code = re.sub('-*\\n$', "", code)
            code = re.sub('\s*name: *.*?\\n', "\n", code)
            code = re.sub('\s*log: *.*?\\n', "\n", code)
            code = re.sub('\s*log type: *.*?\\n', "\n", code)
            code = re.sub('\s*opened on: *.*?\\n', "\n", code)
            code = re.sub('\s*closed on: *.*?\\n', "\n", code)
            code = re.sub('\s*closed on: *.*?\\n', "\n", code)
            code = re.sub('\\n\\n. \n. ', '\\n\\n. ', code)
            code = re.sub('\n\.\s\n', '\n', code)
            code = re.sub("(?:\\n|^)\. ..*?\\n", "", code)
            code = re.sub("\s{1,3}[0-9]{1,2}\.\s.*?\\n", "", code)
            code = re.sub(r"\.\s\w.*?(?:\\n|$)", "", code)
            code = re.sub('\\n{1,}$', "", code)
            code = re.sub('^\\n{0,}', "\n", code)
            log_file.truncate(0)
        return code

    def backup_log(self, input_file, output):
        with open(output, 'w') as out_file:
            with open(input_file, 'r') as in_file:
                lf = in_file.read()
            out_file.write(lf)

iPyStata = iPyStata()

def clean_at_close():
    if os.path.isfile(os.path.join(iPyStata.tornado_dir, 'temp_graph.pdf')):
        os.remove(os.path.join(iPyStata.tornado_dir, 'temp_graph.pdf'))

atexit.register(clean_at_close)

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
    @argument('-cwd', '--changewd', help='Define a working directory for the Stata session.')
    @argument('-gr', '--graph', action='store_true', default=False, help='This will classify the Stata cell as one that returns a graph.')
    @argument('-os', '--openstata', action='store_true', default=False, help='Open Stata.')
    @argument('-cl', '--close', action='store_true', default=False, help='Tries (!) to auto-close Stata')



    @needs_local_scope
    @cell_magic
    def stata(self, line, cell, local_ns=None):

        def stata_list(l):
            return ' '.join([str(x) for x in l])
        
        python_cwd = os.getcwdu() if sys.version_info[0] == 2 else os.getcwd()

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
                if isinstance(val, (list, int, float, complex, str)):
                    if isinstance(val, list):
                        stata_lists.append(stata_list(val))
                    else:
                        stata_lists.append(stata_list([val]))
                    name_list.append(input)
                else:
                    pass
                
        if args.changewd:
            try:
                wd = local_ns[args.changewd]
            except KeyError:
                try:
                    wd = self.shell.user_ns[args.changewd]
                except KeyError:
                    wd = args.changewd

        data_dir = os.path.join(self._lib_dir, 'data_input.dta')
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
                    val.to_stata(data_dir, convert_dates= {x:'tc' for x in date_var}, write_index=False)
                else:
                    val.to_stata(data_dir, write_index=False)
            else:
                pass

        stata = config.stata_install
        log_file = os.path.join(self._lib_dir, 'log_output.log')
        backup_log = os.path.join(self._lib_dir, 'backup_log.txt')
        data_out = os.path.join(self._lib_dir, 'data_output.dta')
        code_file = os.path.join(self._lib_dir, 'code.do')
        graph_out = os.path.join(iPyStata.tornado_dir, 'temp_graph.pdf')
        
        try:
            os.remove(os.path.join(iPyStata.tornado_dir, 'temp_graph.pdf'))
        except OSError:
            pass
        
        with open(code_file, "w") as myfile:
            myfile.write("clear" + "\n" + "set more off"+ "\n" + 'set linesize 200' + "\n")
            
            if args.data:
                myfile.write('use "%s"' % data_dir + ", clear \n")
            for x,y in zip(name_list, stata_lists):
                myfile.write("local "+ x + ' ' + y + "\n")
            myfile.write('log using "%s", text replace' % log_file + '\n')
            if args.changewd:
                myfile.write('cd "%s"' % wd.strip('"\'') + '\n')
            myfile.write(cell)
            myfile.write('\n' + 'log close' + '\n')
            
            if args.output:
                myfile.write('save "%s", replace ' % data_out + "\n")     
            if args.graph:
                myfile.write('graph display \n')
                myfile.write('graph export "%s", replace' % graph_out + "\n")
            myfile.write("\n" + "// End of line deletion prevention")

        if mac_os:
            if args.openstata:
                cmd = [stata, 'do', code_file]
            else:
                cmd = [stata, '-e', 'do', code_file]
        elif windows_os:
            if args.openstata:
                cmd = [stata, 'do', code_file]
            else:
                cmd = [stata, '/e', 'do', code_file]            
        else:
            cmd = [stata, "do", code_file]

        try:
            p = subprocess.Popen(cmd)
            p.communicate()
        except:
            return "Failed to open Stata"

        time.sleep(1)

        iPyStata.backup_log(log_file, backup_log)
        out = iPyStata.process_log(log_file)
            

        if args.output:
            try:
                output_ipys = pd.read_stata(data_out)
                try:
                    output_ipys.drop('index', axis=1, inplace=True)
                    self.shell.push({args.output: output_ipys })
                except:
                    self.shell.push({args.output: output_ipys })
            except:
                print("Exception has occured. File could not be loaded. (Note, Pandas needs to be 0.17.x or higher.)")

        if not args.noprint:
            if args.graph:
                if not len(out) < 5:
                    print(out)
                if re.search('could not find Graph window', out, flags=re.I) is None:
                    return IFrame('./temp_graph.pdf', width=700, height=400)
                else:
                    print('\nNo graph displayed, could not find one generated in this cell.')
            else:
                return print(out)
        else:
            return

# Register the magic function:
ip = get_ipython()
ip.register_magics(iPyStataMagic)

# Enable the stata syntax highlighting:
js = "IPython.CodeCell.config_defaults.highlight_modes['magic_stata'] = {'reg':[/^%%stata/]};"
display.display_javascript(js, raw=True)