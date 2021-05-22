set shell = CreateObject("WScript.Shell")
WScript.Sleep 6000
path = shell.CurrentDirectory
shell.SendKeys path+"\FileDownloads\sampleTiff"
shell.SendKeys"{TAB} "
shell.SendKeys"{ENTER}"