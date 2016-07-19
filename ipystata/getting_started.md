# Introduction to the Jupyter Notebook

This guide will provide instructions on getting the Jupyter Notebook up and running.   

The simplified diagram below illustrates how the Jupyter Notebook works:

![](https://dl.dropboxusercontent.com/u/1265025/python_tut/illustration_3a.png)

There are three components: 

1. The Jupyter Notebook which is accessed and used through your browser
2. The Jupyter Server that is run on a computer
3. The different kernels that perform the actual execution of code

There are several things to note: 

- You can run the Jupyter Server on your own computer and connect to it locally in your browser (you can do this even without internet). However, it is also possible to run the Jupyter Server on a different computer, for example a high performance computation server in the cloud, and connect to it over the internet. For the Jupyter Notebook itself you only need a modern web-browser like Chrome or Firefox.
- The Jupyter Server requires the Python language to work and the Python Kernel is always included by default. Other kernels, such as the Stata kernel, need to be added manually after the installation. 

# Installing Jupyter

For new users I highly recommend to install a Python distribution like [Anaconda](https://www.continuum.io/downloads). This will automatically install Python, the Jupyter Notebook, and other commonly used packages for scientific computing and data science. You can choose between Python 2.7 and Python 3.5, I personally would recommend going for Python 3.5.   

*Notes on the installation:*
- The default installation directory (in the user directory) is in most cases fine.
- Click `yes` if asked to add the path to your environment (this is desirable in most cases).

After installing the Anaconda distribution you have everything ready to start using the Jupyter Notebook with the Python programming language.

# Adding IPyStata 

Installing IPyStata is easy by running the following command from the Python command line:  
`pip install ipystata`

Depending on your operating system it is required to perform a first configuration, visit the link below for instructions:
[Set up IPyStata](https://github.com/TiesdeKok/ipystata#set-up-ipystata)

# Adding other kernels

There are kernels available for a large amount of programs and programming languages. The installation instructions are different for each kernel but is usually well explained in the corresponding repository.

A selection of kernels:

* [SAS](https://github.com/sassoftware/sas_kernel)
* R: [rpy2](http://rpy2.bitbucket.org/) or [irkernel](http://irkernel.github.io/)
* [MATLAB](https://github.com/calysto/matlab_kernel)
* [Julia](https://github.com/JuliaLang/IJulia.jl)

For more kernels use Google or check this list: [Kernel List](https://github.com/ipython/ipython/wiki/IPython-kernels-for-other-languages)

# Starting a Jupyter Server

You can only connect to a live Jupyter Notebook if a corresponding Jupyter Server is running. There are multiple ways to start a Jupyter Server but I will highlight two:

### From the command line:   

1. Open your command prompt (if you are on Windows I recommend using the `Anaconda Command Prompt`)   
2. `cd` to the desired starting directory   
   e.g. `cd "C:\Files\Work\Project_1"`
3. Start the Jupyter Notebook server by typing: `jupyter notebook`   

This should automatically open up the corresponding Jupyter Notebook in the browser.    
You can also manually go to the Jupyter Notebook by going to `localhost:8888` with your browser.   

###Use a third-party Graphical User Interface (Windows only):
I have created a small utility that makes it easy to store directories and start the Jupyter Notebook server:

![](https://raw.githubusercontent.com/TiesdeKok/NotebookOpener/master/Images/example.png)

For instructions and a download link see: [Notebook Opener](https://github.com/TiesdeKok/NotebookOpener)

### Closing down the Jupyter Server:

If you want to close down the Jupyter Server you open up the command prompt window that runs the server and you press `CTRL + C` twice. Make sure that you have saved any open Jupyter Notebooks!

# Use the Jupyter Notebook:

####A good introduction video on the basic of using the Jupyter Notebook is available here: 
[Youtube](https://youtu.be/e9cSF3eVQv0)

####Tips and Tricks:
Two modes: 

`command mode` --> enable by pressing `esc`   
 `edit mode` --> enable by pressing `enter`   

Useful shortcuts:

|  `command mode` |`edit mode` 	
|---	|---	
|  `Y` : cell to code	|  `Tab` : code completion or indent
| `M` : cell to markdown  |   `Shift-Tab` : tooltip
| `A` : insert cell above  	|   	`Ctrl-A` : select all
| `B` : insert cell below  	|   `Ctrl-Z` : undo
| `X`: cut selected cell |   


|  `both modes` |	
|---	
|  `Shift-Enter` : run cell, select below
| `Ctrl-Enter` : run cell 

# Run into problems?

Feel free to open an issue on this GitHub page and I will try to help!