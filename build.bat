set ChromePath="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

if exist %ChromePath% (
  ant -DchromePath=%ChromePath%
  goto end
) 

echo Chrome not exists.

:end

