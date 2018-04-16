from __future__ import print_function
from . import config

import sys
py3 = sys.version_info > (3,)

from IPython.core.magic import (Magics, magics_class, line_magic,
                                cell_magic, line_cell_magic, needs_local_scope)
from IPython.core.magic_arguments import (argument, magic_arguments,
    parse_argstring)
from IPython.core import display
from IPython.display import Image

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
import win32com.client
import psutil
import atexit
from datetime import datetime

class iPyStata:

    def __init__(self):
        self._pid_file = os.path.join(config._config_dir, 'pid_list.txt')

        ## Perform a clean-up at the start (Note: this closes all previously started win32com Stata instances!)

        if os.path.isfile(self._pid_file):
            if not os.stat(self._pid_file).st_size == 0:
                with open(self._pid_file, 'r') as pid_text:
                    still_open = self.get_stata_pid()
                    pids = pid_text.read().split(',')
                    count_close = 0
                
                    for x in pids:
                        if int(x) in still_open:
                            psutil.Process(int(x)).terminate()
                            count_close += 1
                    if count_close > 0:
                        print('Terminated %d unattached Stata session(s).' % count_close)
            else:
                os.remove(self._pid_file)

        time.sleep(1)

        stata_dir = os.path.join(get_ipython_cache_dir(), 'stata')
        for x in os.listdir(stata_dir):
            if re.match('^log_.*', x):
                try:
                    os.remove(os.path.join(stata_dir, x))
                except:
                    pass

    def process_log(self, log):
        with open(log, 'r+') as log_file:
            code = log_file.read()
            # Remove horizontal line at the beginning of flie
            code = re.sub(r"^-*\n", "", code)
            # Remove other lines from the beginning of flie
            code = re.sub(r"\s*name: *.*?\n+", "", code)
            code = re.sub(r"\s*log: *.*?\n+", "", code)
            code = re.sub(r"\s*log type: *.*?\n+", "", code)
            code = re.sub(r"\s*opened on: *.*?\n+", "", code)
            code = re.sub(r"\s*closed on: *.*?\n+", "", code)
            code = re.sub(r"\s*closed on: *.*?\n+", "", code)
            # Remove mata commands
            code = re.sub(r"(?m)^\.\smata.*\n.*\n+", "\n", code)
            code = re.sub(r"(?m)^\:\send.*\n.*\n+", "", code)
            code = re.sub(r"(?m)^\:\s.*\n+", "", code)
            # Match lines beginning with period
            code = re.sub(r"(?m)^\.[^{}\n]+(?:\{[^{}]*\})?\n", "", code)
            # Match lines beginning with >
            code = re.sub(r"(?m)^\>.*\n+", "", code)
            # Remove multiple new lines from the end of file
            code = re.sub(r"\n+$", "\n", code)
            # Remove multiple new lines from the beginning of the file
            code = re.sub(r"^\n+", "\n", code)
            # Remove multiple intermediate new lines
            code = re.sub(r'\n{3,}', "\n\n", code)
            log_file.truncate(0)
        return code

    def process_cmd(self, text):
        cell = text
        ## Remove line breaks
        cell = re.sub(r"[ ]{1,}\/\/\/.*\n[\s]*", " ", cell)
        ## Remove comments starting with //
        cell = re.sub(r"[ ]{1,}\/\/.*", "", cell)
        ## Remove comments between /* */
        cell = re.sub(r"\/\*((.|\n)*)\*\/", "", cell)
        ## Remove lines starting with *
        cell = re.sub(r"(?m)^\*.*\n?", "", cell)
        return cell

    def get_stata_pid(self):
        pid_list = []
        for proc in psutil.process_iter():
            try:
                if re.match('stata', proc.name(), flags=re.I):
                    pid_list.append(proc.pid)
            except:
                pass
        return pid_list

iPyStata = iPyStata()

def clean_at_close():
    if os.path.isfile(iPyStata._pid_file):
        with open(iPyStata._pid_file, 'r') as pid_text:
            still_open = iPyStata.get_stata_pid()
            pids = pid_text.read().split(',')
            for x in pids:
                if int(x) in still_open:
                    psutil.Process(int(x)).terminate()

atexit.register(clean_at_close)

@magics_class
class iPyStataMagic(Magics):

    def __init__(self, shell):
        super(iPyStataMagic, self).__init__(shell)
        self._lib_dir = os.path.join(get_ipython_cache_dir(), 'stata')
        self._pid_file = iPyStata._pid_file
        if not os.path.exists(self._lib_dir):
            os.makedirs(self._lib_dir)

        self.session_dict = {}
        self.do_dict = {}
        self.log_dict = {}
        self.gph_info_dict = {}
        self.pid_list = [] 

    @magic_arguments()

    @argument('-i', '--input', action='append', help='This is an input argument.')
    @argument('-d', '--data', help='This is the data input argument.')
    @argument('-o', '--output', help='This is the output argument.')
    @argument('-np', '--noprint', action='store_true', default=False, help='Force the magic to not return an output.')
    @argument('-os', '--openstata', action='store_true', default=False, help='Open Stata.')
    @argument('-s', '--session', default='main', help='The name of a Stata session in which the cell has to be executed.')
    @argument('-cwd', '--changewd', action='store_true', default=False, help='Set the current Python working directory in Stata session.')
    @argument('-gm', '--getmacro', action='append', help='This will attempt to output the named macro values as a dictionary.')
    @argument('-m', '--mata', action='store_true', default=False, help='This will classify the code in the cell as Mata code.')
    @argument('-w', '--width', type=int, default=1000, help='Graph width.')
    @argument('-h', '--height', type=int, default=800, help='Graph height.')
    @argument('-gr', '--graph', action='store_true', default=False, help='Legacy argument. Not active anymore.')
    @argument('-nogr', '--nograph', action='store_true', default=False, help='Prevents graphs from being displayed.')

    @needs_local_scope
    @cell_magic
    def stata(self, line, cell, local_ns=None):

        def active_check(session):
            try:
                self.session_dict[session].UtilIsStataFree()
                return True
            except:
                return False

        def stata_list(l):
            return ' '.join([str(x) for x in l])
        
        def get_graphs_info():
          self.session_dict[session_id].DoCommand("graph dir")
          gnamelist = self.session_dict[session_id].StReturnString("r(list)")
          graphs_info = {}
          for gname in gnamelist.split():
            self.session_dict[session_id].DoCommand("graph describe " + gname)
            ts_str = self.session_dict[session_id].StReturnString("r(command_date)")+" "+self.session_dict[session_id].StReturnString("r(command_time)")
            ts = datetime.strptime(ts_str, "%d %b %Y %H:%M:%S")
            graphs_info[gname] = ts
          return graphs_info

        ## Support functions: sessions, close, close all, reveal all, hide all

        if re.match(r'^sessions$', cell, flags=re.I):
            print('The following sessions have been found:')
            for z in self.session_dict.keys():
                if active_check(z):
                    print(z + ' [active]')
                else:
                    print(z + ' [not active]')
            return

        if re.match(r'^close$', cell, flags=re.I):
            print('The following sessions have been closed:')
            close_list = []
            for z in self.session_dict.keys():
                if active_check(z):
                    self.do_dict[z]('exit')
                    close_list.append(z)
                    print(z)
            for z in close_list:
                self.session_dict.pop(z, None)
            time.sleep(1)
            if os.path.isfile(self._pid_file):
                with open(self._pid_file, 'r') as pid_text:
                    still_open = iPyStata.get_stata_pid()
                    pids = pid_text.read().split(',')
                    for x in pids:
                        if int(x) in still_open:
                            psutil.Process(int(x)).terminate()
                            print('Terminated unattached Stata session.')
            self.pid_list = []
            return

        if re.match(r'^close all$', cell, flags=re.I):
            closed_count = 0
            for x in iPyStata.get_stata_pid():
                psutil.Process(x).terminate()
                closed_count += 1
            self.session_dict = {}
            print('Terminated %d running Stata processes' % closed_count)
            return

        if re.match(r'^reveal all$', cell, flags=re.I):
            reveal_count = 0
            for x in self.session_dict.keys():
                if active_check(x):
                    self.session_dict[x].UtilShowStata(0)
                    reveal_count += 1
            print('Revealed %d Stata sessions.' % reveal_count)
            return

        if re.match(r'^hide all$', cell, flags=re.I):
            hide_count = 0
            for x in self.session_dict.keys():
                if active_check(x):
                    self.session_dict[x].UtilShowStata(1)
                    hide_count += 1
            print('%d Stata sessions have been hidden.' % hide_count)
            return

        ## Obtain the current working directory and if requested set as Stata working directory.

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

        ## Check whether the Stata session exists and is active, status is stored.

        session_id = args.session

        if session_id in self.session_dict and isinstance(self.session_dict[session_id], win32com.client.CDispatch):
            try:
                self.session_dict[session_id].UtilIsStataFree()
                active = True
            except:
                print('Please note: session %s was no longer active and is restarted.' % session_id)
                active = False
        else:
            active = False

        ## If Stata session does not exist or became inactive; start one and store the PID.

        if not active:
            pid_before = iPyStata.get_stata_pid()
            time.sleep(0.5)
            self.log_dict[session_id] = os.path.join(self._lib_dir, 'log_%s.txt' % session_id)
            self.session_dict[session_id] = win32com.client.Dispatch("stata.StataOLEApp")
            self.do_dict[session_id] = self.session_dict[session_id].DoCommandAsync
            self.session_dict[session_id].UtilShowStata(1)
            self.gph_info_dict[session_id] = {}
            self.do_dict[session_id]('log using "{}" , text replace'.format(self.log_dict[session_id]))
            self.do_dict[session_id]('set more off')

            pid_after = iPyStata.get_stata_pid()
            if len(pid_before) == 1 and pid_before == pid_after:
                self.pid_list.append(pid_after[0])
            else:
                try:
                    self.pid_list.append(list(set(pid_after) ^ set(pid_before))[0])
                except:
                    print('PID could not be obtained, can only be closed by using "close all".')

        ## Send Stata session to foreground / background.

        if args.openstata:
            self.session_dict[session_id].UtilShowStata(0)
        else:
            self.session_dict[session_id].UtilShowStata(1)

        ## Build the command that is send to Stata.
            ## Note, combination is to simplify log handling (only one log output has to be processed).

        data_out = os.path.join(self._lib_dir, 'data_output.dta')
        code_list = []
        for x,y in zip(name_list, stata_lists):
            code_list.append("local "+ x + ' ' + y + "\n")
        if args.data:
            code_list.append(r'use "%s"' % data_dir + ", clear \n")
        if args.changewd:
            code_list.append('quietly cd "%s"'% python_cwd + '\n')
            print('Set the working directory of Stata to: %s' % python_cwd)
        if args.mata:
            code_list.append('mata:' + '\n')
        code_list.append(iPyStata.process_cmd(cell))
        if args.mata:
            code_list.append('end' + '\n')
        if args.output:
            code_list.append('quietly save "%s", replace ' % data_out + "\n")
        code_txt= '\n'.join(code_list)

        ## Execute code and wait for the Stata session to finish.

        self.do_dict[session_id](code_txt)

        while self.session_dict[session_id].UtilIsStataFree() == 0:
            pass

        ## Give the log file a second to save and then process it.

        time.sleep(1)
        
        # Get current graph info. Find new ones, and update info
        self.session_dict[session_id].DoCommand("qui log off")
        graphs_info = get_graphs_info()
        graphs_info_old = self.gph_info_dict[session_id]
        new_graphs = []
        for gname in graphs_info.keys():
          if (gname not in graphs_info_old) or graphs_info[gname]!=graphs_info_old[gname]:
            new_graphs.append(gname)
        self.gph_info_dict[session_id] = graphs_info
        
        #export new graphs
        if len(new_graphs)>0 and not args.noprint:
          graphs_out = [os.path.join(self._lib_dir, 'temp_graph'+str(i)+'.png') for i in range(len(new_graphs))]
          gph_exp_code_list = ['graph export "%s", name(%s) replace width(%d) height(%d) ' % (graphs_out[i], new_graphs[i], args.width, args.height) for i in range(len(new_graphs))]
          gph_exp_code_txt= '\n'.join(gph_exp_code_list)

          self.do_dict[session_id](gph_exp_code_txt)
          while self.session_dict[session_id].UtilIsStataFree() == 0:
            pass
        self.session_dict[session_id].DoCommand("qui log on")
        
        out = iPyStata.process_log(self.log_dict[session_id])
        
        #For some reason, after the -log on- the first command 
        #in the next cell doesn't start with a ". " so pre-pend it here
        with open(self.log_dict[session_id], "a") as myfile:
          myfile.write(". ")

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

        if args.getmacro:
            macro_dict = {}
            count_success = 0
            fail_list = []
            for x in args.getmacro:
                try:
                    temp_macro = self.session_dict[session_id].MacroValue("_%s" % x).split(' ')
                    if temp_macro == ['']:
                        fail_list.append(x)
                    else:
                        macro_dict[x] = temp_macro
                        count_success += 1
                except Exception as e:
                    print(e)
                    pass
            if len(fail_list) > 0:
                print("The following macros could not be found: %s" % ', '.join(fail_list))
            if len(macro_dict.keys()) > 0:
                self.shell.push({'macro_dict' : macro_dict})
                print("Several (%dx) macros have been added to the dictionary: macro_dict" % count_success),

        with open(self._pid_file, 'w') as pid_text:
            pid_text.write(','.join(map(str, self.pid_list)))

        if not args.noprint:
            if args.mata:
                print("Mata output:")
                print(out)
            elif not len(out) < 5:
                print(out)
            if len(new_graphs)>0 and not args.nograph:
              for graph_out in graphs_out:
                display.display(Image(graph_out, retina=True))
        else:
            return

# Register the magic function:
ip = get_ipython()
ip.register_magics(iPyStataMagic)

if config.enable_syntax_highlight:
	# Enable the stata syntax highlighting:
	#js = "IPython.CodeCell.config_defaults.highlight_modes['magic_stata'] = {'reg':[/^%%stata/]};"
	js = """require(['notebook/js/codecell'], function(codecell) {
			  codecell.CodeCell.options_default.highlight_modes['magic_stata'] = {'reg':[/^%%stata/]} ;
			  Jupyter.notebook.events.one('kernel_ready.Kernel', function(){
			      Jupyter.notebook.get_cells().map(function(cell){
			          if (cell.cell_type == 'code'){ cell.auto_highlight(); } }) ;
			  });
			});"""
	display.display_javascript(js, raw=True)
