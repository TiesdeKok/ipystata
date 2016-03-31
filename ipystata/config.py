from __future__ import absolute_import
import sys
import os

py3 = sys.version_info > (3,)
if not py3:
    import ConfigParser
else:
    import configparser

from IPython import version_info
if version_info[0] < 4:
    from IPython.utils.path import get_ipython_cache_dir
else:
    from IPython.paths import get_ipython_cache_dir

_config_dir = os.path.join(get_ipython_cache_dir(), 'stata', 'config')
_config_file = os.path.join(_config_dir, 'configuration.ini')

if py3:
    Config = configparser.ConfigParser()
else:
    Config = ConfigParser.ConfigParser()

def make_config():
    with open(_config_file, 'w') as configfile:
        try:
            Config.add_section('Stata configuration')
        except:
            pass
        Config.set('Stata configuration', 'installation', "C:\Program Files (x86)\Stata13\StataMP-64.exe")
        Config.set('Stata configuration', 'force_batch_mode', "False")
        Config.write(configfile)

def ConfigSectionMap(section):
    dict1 = {}
    options = Config.options(section)
    for option in options:
        try:
            dict1[option] = Config.get(section, option)
            if dict1[option] == -1:
                DebugPrint("skip: %s" % option)
        except:
            print("exception on %s!" % option)
            dict1[option] = None
    return dict1

def config_stata(stata, force_batch=False):
    Config.set('Stata configuration', 'installation', r'%s' % stata)
    Config.set('Stata configuration', 'force_batch_mode', r'%s' % force_batch)
    with open(_config_file, 'w') as configfile:
        Config.write(configfile)

if not os.path.exists(_config_dir):
    os.makedirs(_config_dir)
if not os.path.isfile(_config_file):
    make_config()
elif os.path.isfile(_config_file):
    Config.read(_config_file)
    try:
        options = set(Config.options('Stata configuration'))
    except:
        make_config()
    else:
        option_list = set(['installation', 'force_batch_mode'])
        if not len(options.intersection(option_list)) == len(option_list):
            make_config()

batch_mode = ConfigSectionMap("Stata configuration")['force_batch_mode'] == 'True'
stata_install =  ConfigSectionMap("Stata configuration")['installation']