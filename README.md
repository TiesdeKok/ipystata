<h1 align="center">
   <img src="https://i.imgur.com/2FSNsj4.png" alt="Combine Python with Stata using IPyStata" title="Combine Python with Stata using IPyStata" />
</h1>
<p align="center">  
 <a href="https://gitter.im/TiesdeKok/ipystata"><img src="https://img.shields.io/gitter/room/nwjs/nw.js.svg"></a>
 <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
 <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=2UKM4JREAPTBG"><img src="https://img.shields.io/badge/buy%20me%20a-coffee-yellow.svg"></a>
 
</p>

<p align="center">
   <b>:warning:This repository is in archive mode due to my new role. Issues are not monitored.</b><br><br>
  <strong>IPyStata</strong> enables the use of Stata together with Python via Jupyter (IPython) notebooks. <br> <br>
  <span><strong>Author:</strong> Ties de Kok (<a href="http://www.TiesdeKok.com">Personal Page</a>)</span><br>
  <span><strong>PyPi: </strong><a href="https://pypi.python.org/pypi/ipystata ">https://pypi.python.org/pypi/ipystata </a></span><br>
  <span><strong>Documentation: </strong><a href="http://nbviewer.ipython.org/github/TiesdeKok/ipystata/blob/master/ipystata/Example.ipynb">Example notebook</a></span>
</p>

## Table of contents

  * [Get IPyStata](#getipystata)
  * [Setup IPyStata](#setup)
  	* [Windows](#setupwindows)   
  	* [Unix (Linux, Mac OS)](#setupunix)	 
  * [Using IPyStata](#usingipystata)
  * [Changelog](#changelog)
  * [Questions?](#questions)
  * [License](#license)
  * [Special thanks](#specialthanks)

<h2 id="getipystata">Get IPyStata</h2>

### **You can install IPyStata 0.3.0 using:**

    pip install ipystata
    
Alternative, get 4.X version from Github:

    pip install git+https://github.com/TiesdeKok/ipystata
   
### **You can update a previous installation using:**

    pip install ipystata --upgrade --force-reinstall
    
### **Dependencies**
Python 2.7 or 3.x  
IPython 3 or 4+ (http://ipython.org/)  
Pandas **0.17.x +** (http://pandas.pydata.org/) (I recommend to use a distribution like Anaconda)  
Recent version of Stata (13+ preferably) (http://www.stata.com/)  

<h2 id="setup">Set up IPyStata</h2>

#### **Modes of operation:**
IPyStata can communicate with Stata using two different techniques:  

1. **Stata Automation**, works on --> Windows
2. **Stata Batch mode**, works on --> Windows, Mac OS X, and Linux

The `Stata Automation` mode has a richer feature set compared to the `Stata Batch mode`.  
Unfortunately, Stata only supports `Stata Automation` for Stata instances running on a Windows OS.

For Windows `Stata Automation` is set as default but it is possible to set it to use `Stata Batch mode` instead.  
For Unix operating systems (OS X and Linux) it is only possible to use IPyStata in `Stata Batch mode`.

<h3 id="setupwindows">Windows setup (Stata Automation)</h3>

#### Register your Stata instance:
1. Go to your Stata installation directory and either:

    -  Shift + Right-Click --> click "*Open command window here*"  
       **or**
    - Open command window (search for "*cmd*") and type:  
       `cd C:\Program Files (x86)\Stata14`      (Obviously change it to your Stata directory)  

2. Look up the name of your Stata executable (e.g. `StataMP-64.exe`) and in your command window type:  
`StataMP-64.exe /Register`

#### Troubleshooting:
**I get a `com error` when using IPyStata in `Stata Automation` mode?**

> IPyStata cannot communicate with Stata. This error indicates that the registration of Stata was unsuccessful.  
> **A potential solution:**  try to register again but make sure to run the CMD window as administrator.

**Do I have to register Stata everytime I want to use IPyStata?**
> No, you only have to register your Stata instance once unless you want to change your Stata installation.

*For more detailed instructions see [this page](http://www.stata.com/automation/#createmsapp).*

<h3 id="setupunix"> Linux / Mac OS setup (Stata Batch mode)</h3>

The Batch mode approach works on Windows, Mac OS, and Linux
#### Set installation directory for Stata:
The first step is to tell IPyStata where it can find the Stata installation, use the following commands: 

    In[1]: import ipystata  
    In[2]: from ipystata.config import config_stata  
    In[3]: config_stata('Path to your Stata executable')  

**Note:** you need to restart the Jupyter Notebook kernel after setting a new Stata installation!

You can find the Stata executable in the installation directory of Stata, for example:

    Windows  --> 'C:\Program Files (x86)\Stata14\StataSE-64.exe'
    Mac OS X --> '/Applications/Stata/StataSE.app/Contents/MacOS/stataSE'
    Linux    --> '/home/user/stata14/stata-se'

#### Configure IPyStata to use the Stata Batch Mode on Windows:
It is possible to use `config_stata` to configure IPyStata to use the `Stata Batch Mode` on Windows instead of the default `Stata Automation` mode. See the example below:

    In[1]: import ipystata  
    In[2]: from ipystata.config import config_stata  
    In[3]: config_stata('Path to your Stata executable', force_batch=True) 

**Note:** This is only advisable if you have a portable Stata installation that you cannot register or if you want to use IPyStata on a Windows server.   
The `Stata Automation` method is in most other cases a better option.
    
#### Troubleshooting:
**I set the installation directory but IPyStata still does not work?**

> The new Stata installation is only initialized after a complete kernel restart.   
> **A potential solution:**  in the Jupyter Notebook click `kernel` --> `restart`

**Do I have to configure my Stata installation everytime I want to use IPyStata?**
> No, you only have to configure your Stata executable once unless you want to change your Stata installation.

<h2 id="usingipystata">Using IPyStata</h2>

#### **Before you get started:**
If you use `Stata Automation` --> Make sure that you have a registered Stata instance: [Windows](#setupwindows)   
If you use `Stata Batch Mode` --> Make sure that you have configured your Stata installation: [Unix (Linux, Mac OS)](#setupunix)

#### **Using IPyStata:**

You can use IPyStata using the `%%stata` cell magic.  
See the [**basic instructions**](#basic-instructions) below or the [**example notebook**](http://nbviewer.ipython.org/github/TiesdeKok/ipystata/blob/master/ipystata/Example.ipynb).  
Example notebook for Mac OS X and Linux users: [batch mode notebook](http://nbviewer.ipython.org/github/TiesdeKok/ipystata/blob/master/ipystata/Example_batch.ipynb)  

**Note:** most intermediate files are stored in the `.ipython/stata` directory.

If you use `Stata Automation`: 
Several options are included to manage your sessions, see the [**session manager**](#session-manager) section.

#### **Basic instructions:**

IPyStata is imported and loaded using `import ipystata`.
A cell with Stata code is defined by the cell magic `%%stata`.

For example:

    In[1]: import ipystata  
    In[2]: %%stata  
           display "Hello, I am printed in Stata."  


### **Arguments:**
    
Send a Pandas dataframe to be used in the Stata session (**Both methods**):  

    -d --data  
    In[1]: %%stata -d dataframe  
    
Define the DTA version internally, by default set to 114 (**Both methods**):  

    -vr --version  
    In[1]: %%stata -d dataframe -vr 118 

Return the dataset from Stata after code execution and load it into a Pandas dataframe (**Both methods**):  

    -o --output  
    In[1]: %%stata -o dataframe  

Input Python lists and load them into Stata as macros (**Both methods**):  

    -i --input  
    In[1]: example_list = ['var_1', 'var_2']  
    In[2]: %%stata -i example_list  
           display "`example_list'"

Graph will automatically display and multiple graphs are possible (**Only for `Stata Automation`!**):   
If you want to show multiple graphs, you have to make sure to use the , name(.., replace)argument in your Stata code.   
the order is not guaranteed to be the same as the generation order. Recommended to use the title() argument when showing multiple graphs.   

It is possible to prevent graphs from showing using the `-nogr` or `--nograph` arguments.

If you want a Stata graph as an output of a IPyStata cell you can use the following argument (**Only for `Stata Batch Mode`!**):

    -gr --graph  
    In[1]: %%stata -gr
**Note:** *Graph export is only partially supported by Stata if the OS has no GUI. To work around this problem the figures are shown in PDF-format if you use Stata Batch Mode. See: [Statalist](http://www.stata.com/statalist/archive/2011-07/msg00536.html)*

Prevents any output from being shown below the cell (**Both methods**):  

    -np --noprint  
    In[1]: %%stata -np  

For inspection purposes it is possible to open the Stata window instead of running it quietly (**Both methods**):

    -os --openstata  
    In[1]: %%stata -os  
**Note:** *this only works on Windows and Mac OS X.*

Define a session to execute the code with (**Only for `Stata Automation`!**):

    -s --session
    In[1]: %%stata -s session_name
(Note: if no `session` argument is provided the main session is used.)

Set your Python working directory to the Stata session (**Only for `Stata Automation`!**) :

    -cwd --changewd
    In[1]: %%stata -cwd

Set code in the cell to run in Mata (**Only for `Stata Automation`!**) :

    -m --mata
    In[1]: %%stata -m

Retrieve user-defined macros from Stata into a   Python dictionary: `macro_dict` (**Only for `Stata Automation`!**):

    -gm --getmacro    
    In[1]: %%stata -gm macro_1 -gm macro_2  
           local macro_1 item1 item2
           local macro_2 item3 item4
    In[2]: macro_dict['macro_1']
    In[3]: macro_dict['macro_2']

Set a working directoy to use while executing this cell  (**Only for `Stata Batch Mode`!**) :

    -cwd --changewd
    In[1]: %%stata -cwd '~/folder'

### **Session manager (Stata Automation users only):**

IPyStata 0.2 introduces the possibility to use many different Stata sessions that by default run in the background. In order to avoid using unnecessary system resources several tools and automatic cleanup routines are included.

#### Tools:

Display all active Stata sessions:

    In[1]: %%stata
           sessions
Reveal all Stata sessions:

    In[1]: %%stata
           reveal all        
Hide all Stata sessions:

    In[1]: %%stata
           hide all      
Close all Stata sessions initiated by IPyStata:

    In[1]: %%stata
           close
Close all Stata sessions (**Warning! This closes <u>all</u> Stata windows**):

    In[1]: %%stata
           close all
#### Automatic clean-up routines:

- At import/load all Stata sessions initiated by a previous IPyStata import are terminated.
- When IPyStata is unloaded it tries to close all Stata sessions that it created.

<h2 id="changelog">Changelog</h2>


### What is new in 0.4:   
Minor improvements for line width in the log files and added support for UTF-8 encoding in Stata files (requires Pandas 1.0+ to work!).

### What is new in 0.3:
The `Stata Automation` method introduced in IPyStata 0.2 only works on Windows, this release adds support for the Mac OS X and Linux operating systems using the `Stata Batch Mode` approach. 

The execution methods are determined by IPyStata, non-Windows users will automatically use the `Stata Batch Mode` technique.   
For Windows users the default method is `Stata Automation`, but it is possible to configure IPyStata to use the `Stata Batch Mode` instead. 

### What is new in 0.2:

After a discussion with James Fielder I decided to overhaul my initial code to have it interact with Stata using Automation instead of the batch mode. This approach is inspired by James his Stata-Kernel, check out the awesome early development version here: https://github.com/jrfiedler/stata-kernel.

> **Pros:**
>
> - Extra functionality:
>     - Persistent Stata sessions. (*Just as-if you were using Stata directly!*)
>     - Multiple Stata sessions in one notebook.
>     - Allows IPystata to  retrieve macros directly from Stata into Python.
> - This approach is more idiomatic as it allows for direct interaction with Stata.
> - Keeps my Stata magic functionality consistent with the Stata kernel by James Fiedler.
>
> **Cons:**
>
> - Windows only (Stata Automation is Windows only).
> - Requires the user to register their Stata client.
> - Requires recent Stata version (13 / 14).
>
> **Bug fixes and other improvements:**
>
> - Improved the output display functionality:
>  - Loops should now be displayed correctly.
>  - Fixed inconsistent white spaces at the begin / end of output.
> - Internal file-handling changed to using absolute paths, working directory functionality is now explicitly included in the -cwd argument.
> - Package is compatible for both Python 2.7.x and Python 3.x.
> - **Plots are now supported using the `-gr` or `--graph` arguments (added in 0.2.1)**
> - **Both IPython 3 and IPython 4 are now supported (added in 0.2.2)**
> - **Fixed error when replacing dataset in Stata + single item to macro now possible (added in 0.2.3)**
>
> **Todo:**
>
> - ~~Add an option for non-Windows users that uses the batch mode functionality.~~
> - Explore the possibilities of asynchronous Stata code execution using different sessions.
> - Improve Stata syntax highlighting.


## Syntax Highlighting

Experimental support for Stata syntax highlighting is included. CodeMirror does not have a Stata mode, hence the R mode is modified to accomodate Stata code. Setup instructions are below:

Find your notebook package installation folder. For example:

If you are using IPython 3 go to the folder `IPython`, for IPython 4 go to the folder `notebook`:

    C:\Users\*User*\AppData\Local\Enthought\Canopy\User\Lib\site-packages\IPython
    C:\Users\*User*\Anaconda\Lib\site-packages\IPython

    C:\Users\*User*\AppData\Local\Enthought\Canopy\User\Lib\site-packages\notebook
    C:\Users\*User*\Anaconda\Lib\site-packages\notebook


In the `IPython` folder **(IPython 3 users)** go to the following directory:

    \IPython\html\static\components\codemirror\mode

In the `notebook` folder **(IPython 4 users)** go to the following directory:

    \notebook\static\components\codemirror\mode\

Create a new folder in the "mode" folder called 'stata'

    \IPython\html\static\components\codemirror\mode\stata
**or**

    \notebook\static\components\codemirror\mode\stata

Copy **stata.js** from the ipystata folder (see Github) into the newly created 'stata' folder.

You can then enable syntax highlighting by running the following code in a Jupyter Notebook cell and restarting the kernel:  

    import ipystata  
    from ipystata.config import config_syntax_higlight    
    config_syntax_higlight(True)    
    
<h2 id="questions">Questions?</h2>

If you have questions or experience problems please use the `issues` tab of this repository.   
You can also e-mail me at t.c.j.dekok [at] tilburguniversity.edu .

<h2 id="license">License</h2>  

[MIT](LICENSE) - Ties de Kok - 2017

<h2 id="specialthanks">Special mentions</h2>

This project is inspired by and based on the excelent work of:  

- Rpy2 (https://pypi.python.org/pypi/rpy2)
- Fortran Magic (https://pypi.python.org/pypi/fortran-magic)
- Stata-Kernel (https://github.com/jrfiedler/stata-kernel)

Contributors:  
[**@Pacbard**](https://github.com/pacbard)   
[**@bquistorff**](https://github.com/bquistorff) 

## Disclaimer

This project is not affiliated with or endorsed by Statacorp.
