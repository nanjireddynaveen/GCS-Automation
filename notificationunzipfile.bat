@echo off
for  /r "C:\gcs_automation\src\downloads" %%I in ("*.zip") do (
  "%ProgramFiles%\7-Zip\7z.exe" x -y -o"%%~dpnI" "%%~fI" 
)

exit



