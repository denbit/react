@echo OFF
setlocal
 set pth=%~dp0

set ZipArgs=%1 %2 %3 %4 %5 %6 %7 %8 %9
for /L %%i in (0,1,8) do @shift
set ZipArgs=%ZipArgs% %1 %2 %3 %4 %5 %6 %7 %8 %9
for /L %%i in (0,1,8) do @shift
set ZipArgs=%ZipArgs% %1 %2 %3 %4 %5 %6 %7 %8 %9

php  %pth%convert.php %ZipArgs%