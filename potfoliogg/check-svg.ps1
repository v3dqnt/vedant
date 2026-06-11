$content = Get-Content "public\figure-red.svg" -Raw -Encoding UTF8
# Find all fill= values
$matches = [regex]::Matches($content, 'fill="[^"]*"')
$unique = $matches | ForEach-Object { $_.Value } | Sort-Object -Unique
Write-Host "Unique fill values in figure-red.svg:"
$unique | ForEach-Object { Write-Host $_ }
