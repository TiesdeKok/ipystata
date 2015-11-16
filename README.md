# IPyStata

Enables the use of Stata together with Python via Jupyter (IPython) notebooks.

Allows the user to write and execute Stata code from within a Jupyter (IPython) Notebook.  See the example notebook below for an illustration of the functionality.

**Author:**   Ties de Kok *(t.c.j.dekok@tilburguniversity.edu)*  
**Twitter:** [@TiesdeKok](https://twitter.com/TiesdeKok/)  
**Homepage:**    https://github.com/TiesdeKok/ipystata  
**PyPi:** https://pypi.python.org/pypi/ipystata  
**Documentation:** [**basic instructions**](#basic-instructions) or [**example notebook**](http://nbviewer.ipython.org/github/TiesdeKok/ipystata/blob/master/ipystata/Example.ipynb)

## Practical information:

####**You can install IPyStata 0.2.2 using:**

    pip install ipystata
**or**

    pip install git+https://github.com/TiesdeKok/ipystata

#### **Or you can install IPyStata 0.1.4 (does not use Stata Automation) using:**

    pip install ipystata==0.1.4

####**Register your Stata instance**
Go to your Stata installation directory and either:

-  Shift + Right-Click --> click "*Open command window here*"
**or**
- Open command window (search for "*cmd*") and type:  
`cd C:\Program Files (x86)\Stata14`      (Obviously change it to your Stata directory)  

Look up the name of your Stata executable (e.g. `StataMP-64.exe`) and in your command window type:  
`StataMP-64.exe /Register`

**If you get a com error when using IPyStata it means that the registration was unsuccesful.**  
**A potential solution is to run the CMD window as administrator.**  
Note that this is independent of IPyStata, if you have done it before there is no need to do it again.  
For more detailed instructions see [this page](http://www.stata.com/automation/#createmsapp).

####**Dependencies**
IPython 3 or 4 (http://ipython.org/)  
Pandas **0.17.x +** (http://pandas.pydata.org/) (I recommend to use a distribution like Anaconda)  
Recent version of Stata (13 / 14 preferably) (http://www.stata.com/)  

####**How to use?**
Make sure that you have a registered Stata instance ([instructions](#register-your-stata-instance))!

You can use IPyStata using the `%%stata` cell magic.
See the [**basic instructions**](#basic-instructions) below or the [**example notebook**](http://nbviewer.ipython.org/github/TiesdeKok/ipystata/blob/master/ipystata/Example.ipynb).

Note that all intermediate files are stored in the ‘.ipython/stata’ directory.
Several options are included to manage your sessions, see the [**session manager**](#session-manager) section.

## What is new in 0.2:

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
>
> **Todo:**
>
> - Add an option for non-Windows users that uses the batch mode functionality.
> - Explore the possibilities of asynchronous Stata code execution using different sessions.
> - Improve Stata syntax highlighting.


## Basic instructions

For an example of the functionality see the [**example notebook**](http://nbviewer.ipython.org/github/TiesdeKok/ipystata/blob/master/ipystata/Example.ipynb).
If you have never done it before, make sure to register your Stata instance ([**instructions**](#register-your-stata-instance)).

IPyStata is imported and loaded using `import ipystata`.
A cell with Stata code is defined by the cell magic `%%stata`.

For example:

    In[1]: import ipystata  
    In[2]: %%stata  
           display "Hello, I am printed in Stata."  


##Arguments

Define a session to execute the code with (**New in 0.2**):

    -s --session
    In[1]: %%stata -s session_name
(Note: if no `session` argument is provided the main session is used.)

Set your Python working directory to the Stata session (**New in 0.2**):

    -cwd --changewd
    In[1]: %%stata -cwd

Send a Pandas dataframe to be used in the Stata session:  

    -d --data  
    In[1]: %%stata -d dataframe  

Return the dataset from Stata after code execution and load it into a Pandas dataframe:  

    -o --output  
    In[1]: %%stata -o dataframe  

Input Python lists and load them into Stata as macros:  

    -i --input  
    In[1]: example_list = ['var_1', 'var_2']  
    In[2]: %%stata -i example_list  
           display "`example_list'"

If you want a Stata graph as an output of a IPyStata cell you can use the following argument (**New in 0.2.1**):

    -gr --graph  
    In[1]: %%stata -gr

Retrieve user-defined macros from Stata into the following Python dictionary `macro_dict` (**New in 0.2**):

    -gm --getmacro    
    In[1]: %%stata -gm macro_1 -gm macro_2  
           local macro_1 item1 item2
           local macro_2 item3 item4
    In[2]: macro_dict['macro_1']
    In[3]: macro_dict['macro_2']

Prevents any output from being shown below the cell:  

    -np --noprint  
    In[1]: %%stata -np  

For debugging or inspection purposes it is possible to open the Stata window instead of running it quietly:

    -os --openstata  
    In[1]: %%stata -os  

##Session manager

IPyStata 0.2 introduces the possibility to use many different Stata sessions that by default run in the background. In order to avoid using unnecessary system resources several tools and automatic cleanup routines are included.

### Tools:

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
### Automatic clean-up routines:

- At import/load all Stata sessions initiated by a previous IPyStata import are terminated.
- When IPyStata is unloaded it tries to close all Stata sessions that it created.

##Syntax Highlighting

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

##Special mentions


This project is inspired by and based on the excelent work of:  

- Rpy2 (https://pypi.python.org/pypi/rpy2)
- Fortran Magic (https://pypi.python.org/pypi/fortran-magic)
- Stata-Kernel (https://github.com/jrfiedler/stata-kernel)

##Disclaimer

This project is not affiliated with or endorsed by Statacorp.
