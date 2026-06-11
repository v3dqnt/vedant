$svg = Get-Content "public\meow.svg" -Raw -Encoding UTF8
# The <g> element has fill="#000000" — just change that to crimson red
$red = $svg -replace 'fill="#000000"', 'fill="#ff0033"'
$red | Set-Content "public\meow-red.svg" -Encoding UTF8
Write-Host "Done"
