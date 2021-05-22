@echo off
for  /r "C:\gcs_automation\app\OutputMileStone500" %%I in ("*.zip") do (
  "%ProgramFiles%\7-Zip\7zG.exe" x -y -o"%%~dpnI" "%%~fI" 
)

exit



