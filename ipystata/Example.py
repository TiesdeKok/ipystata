
# coding: utf-8

# ## Example notebook for the %%stata cell magic by the IPyStata package. 

# **Author:**   Ties de Kok <t.c.j.dekok@tilburguniversity.edu>  
# **Twitter:** @TiesdeKok <https://twitter.com/TiesdeKok/>  
# **Homepage:**    https://github.com/TiesdeKok/ipystata  
# **PyPi:** https://pypi.python.org/pypi/ipystata  

# ## Import packages

# In[1]:

import pandas as pd


# In[2]:

import ipystata


# ## Configure ipystata

# Make sure that you have registered your Stata instance. (See GitHub for instructions). 

# ## Check whether IPyStata is working

# In[3]:

get_ipython().run_cell_magic('stata', '', '\ndisplay "Hello, I am printed by Stata."')


# # Some examples based on the Stata 13 manual

# ## Load the dataset "auto.dta" in Stata return it back to Python as a Pandas dataframe

# The code cell below runs the Stata command **`sysuse auto.dta`** to load the dataset and returns it back to Python via the **`-o car_df`** argument.

# In[4]:

get_ipython().run_cell_magic('stata', '-o car_df', 'sysuse auto.dta')


# **`car_df`** is a regular Pandas dataframe on which Python / Pandas actions can be performed. 

# In[5]:

car_df.head()


# ## Basic descriptive statistics

# The argument **`-d or --data`** is used to define which dataframe should be set as dataset in Stata.  
# In the example below the Stata function **`tabulate`** is used to generate some descriptive statistics for the dataframe **`car_df`**.

# In[6]:

get_ipython().run_cell_magic('stata', '-d car_df', 'tabulate foreign headroom')


# These descriptive statistics can be replicated in Pandas using the **`crosstab`** fuction, see the code below.

# In[7]:

pd.crosstab(car_df['foreign'], car_df['headroom'], margins=True)


# ## Stata graphs

# If you want to get a Stata graph as an output of your IPyStata cell you can use the **`-gr` or `--graph`** argument.  
# This will only work for one graph per cell (it will display the most recent graph). 

# In[8]:

get_ipython().run_cell_magic('stata', '-s graph_session --graph', 'use http://www.ats.ucla.edu/stat/stata/notes/hsb2, clear\ngraph twoway scatter read math')


# ## Use Python lists as Stata macros

# In many situations it is convenient to define values or variable names in a Python list or equivalently in a Stata macro.  
# The **`-i or --input`** argument makes a Python list available for use in Stata as a local macro.  
# For example, **`-i main_var`** converts the Python list **`['mpg', 'rep78']`** into the following Stata macro: **``main_var'`**.

# In[9]:

main_var = ['mpg', 'rep78']
control_var = ['gear_ratio', 'trunk', 'weight', 'displacement']


# In[10]:

get_ipython().run_cell_magic('stata', '-i main_var -i control_var -os', '\ndisplay "`main_var\'"\ndisplay "`control_var\'"\n\nregress price `main_var\' `control_var\', vce(robust)')


# ## Modify dataset in Stata and return it to Python

# It is possible create new variables or modify the existing dataset in Stata and have it returned as a Pandas dataframe.  
# In the example below the output **`-o car_df`** will overwrite the **`car_df`** previously created.  
# Note, the argument **`-np or --noprint`** can be used to supress any output below the code cell.

# In[11]:

get_ipython().run_cell_magic('stata', '-o car_df -np', 'generate weight_squared = weight^2\ngenerate log_weight = log(weight)')


# In[12]:

car_df.head(3)


# ## Retrieve macro from Stata back into Python

# The **`-gm`** or **`--getmacro`** argument allows a macro to be extracted from a Stata session. The macro will be added to the **`macro_dict`** dictionary.

# In[13]:

get_ipython().run_cell_magic('stata', '-s macro_example -gm macro_1 -gm macro_2', 'local macro_1 one two\nlocal macro_2 three four')


# In[14]:

macro_dict


# In[15]:

macro_dict['macro_1']


# ## Set Python working directory in Stata 

# In[16]:

import os
os.chdir(r'C:/')


# In[17]:

get_ipython().run_cell_magic('stata', '-cwd', 'display "`c(pwd)\'"')


# ## Using Sessions

# IPyStata 0.2 introduces the possibility to use many different Stata sessions that by default run in the background.  
# These sessions are defined using the **`-s`** or **`--session`** arguments. 

# ### Session example 1

# In[18]:

get_ipython().run_cell_magic('stata', '-s session_1 -np', 'local session Hello I am session 1 and I am persistent')


# In[19]:

get_ipython().run_cell_magic('stata', '-s session_2 -np', 'local session Hello I am session 2 and I am persistent')


# In[20]:

get_ipython().run_cell_magic('stata', '-s session_1', 'display "`session\'"')


# In[21]:

get_ipython().run_cell_magic('stata', '-s session_2', 'display "`session\'"')


# ### Session example 2

# In this example a logistic regression is performed in one cell and a postestimation (predict) is performed on this regression in the next cell.

# In[22]:

get_ipython().run_cell_magic('stata', '-s auto_session', 'sysuse auto\nlogit foreign weight mpg')


# In[23]:

get_ipython().run_cell_magic('stata', '-s auto_session', 'predict probhat\nsummarize probhat')


# ## Session manager tools

# In order to avoid using unnecessary system resources several tools and automatic cleanup routines are included.

# ### Display all active Stata sessions:

# In[24]:

get_ipython().run_cell_magic('stata', '', 'sessions')


# ### Reveal all Stata sessions

# In[25]:

get_ipython().run_cell_magic('stata', '', 'reveal all')


# ### Hide all Stata sessions

# In[26]:

get_ipython().run_cell_magic('stata', '', 'hide all')


# ### Close all Stata sessions initiated by IPyStata

# In[27]:

get_ipython().run_cell_magic('stata', '', 'close')


# Close all Stata sessions (**Warning! This closes <u>all</u> Stata windows**)

# In[28]:

get_ipython().run_cell_magic('stata', '', 'close all')


# ## An example case

# Create the variable **`large`** in Python and use it as the dependent variable for a binary choice estimation by Stata.

# In[29]:

car_df['large'] = [1 if x > 3 and y > 200 else 0 for x, y in zip(car_df['headroom'], car_df['length'])]


# In[30]:

car_df[['headroom', 'length', 'large']].head(7)


# In[31]:

main_var = ['mpg', 'rep78']
control_var = ['gear_ratio', 'trunk', 'weight', 'displacement']


# In[32]:

get_ipython().run_cell_magic('stata', '-d car_df -i main_var -i control_var', "\nlogit large `main_var' `control_var', vce(cluster make)")

