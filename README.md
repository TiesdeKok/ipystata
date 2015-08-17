# IPyStata

Enables the use of Stata cell magic in Jupyter (IPython) Notebooks.

Allows the user to write and execute Stata code from within a Jupyer Notebook.  
Interaction with Stata is accomplished through the batch mode of Stata. The code contained in a %%stata cell is send to Stata via a temporary ‘.do’ file, the Stata output is captured via ‘.log’ files and datasets are transferred by converting Pandas dataframes to ‘.dta’ files and vice-versa. All intermediate files are stored in the ‘.ipython/stata’ directory. 


**Author:**   Ties de Kok <t.c.j.dekok@tilburguniversity.edu>  
**Homepage:**    https://github.com/TiesdeKok/ipystata  
**PyPi:** https://pypi.python.org/pypi/ipystata  
**Documentation:** Work-in-Progress  

Install
=======

You can install or upgrade via pip:  

    pip install ipystata
    
Dependencies
============

IPython 3 (Not yet tested in IPython 4)  
Pandas                                   


Basic instructions
==================

One initial configuration step is required to define your installation of Stata by running:  

    In[1]: import ipystata
    In[2]: from ipystata.ipystata_magic import iPyStata  
    In[3]: iPyStata.config_stata('Path to your Stata executable')  
  
For example:

    In[1]: import ipystata  
    In[2]: from ipystata.ipystata_magic import iPyStata  
    In[3]: iPyStata.config_stata('C:\Program Files (x86)\Stata13\StataMP-64.exe')  
  
The configuration will be saved and is thus only required to be performed once at initial use. 

IPyStata is imported and loaded using "import ipystata". A cell with Stata code is started with the cell magic "%%stata". 

For example:

    In[1]: import ipystata  
    In[2]: %%stata  
           display "Hello, I am printed in Stata."  
         

Arguments
==========

Send a Pandas dataframe to be used in Stata:  

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

Prevents any output from being shown below the cell, used to run Stata code quietly:  

    -np --noprint  
    In[1]: %%stata -np  

For debugging or inspection purposes it is possible to force the Stata window to remain open after execution:

    -os --openstata  
    In[1]: %%stata -os  

Syntax Highlighting
===================

Experimental support for Stata syntax highlighting is included. CodeMirror does not have a Stata mode, hence the R mode is modified to accomodate Stata code. Instructions to use: 

Find your IPython package installation folder. For example:

    C:\Users\*User*\AppData\Local\Enthought\Canopy\User\Lib\site-packages\IPython
    C:\Users\*User*\Anaconda\Lib\site-packages\IPython

In this IPython folder go to:

    \IPython\html\static\components\codemirror\mode
    
Create a new folder in the "mode" folder called 'stata'

    \IPython\html\static\components\codemirror\mode\stata
    
Copy **stata.js** from the ipystata folder (see Github) into the newly created 'stata' folder.
