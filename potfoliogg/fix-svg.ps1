# Step 1: Create a clean version - only remove background, preserve all other colors
$svg = Get-Content "public\WhatsApp Image 2026-05-31 at 20.14.43.svg" -Raw -Encoding UTF8

# Only replace the solid background fill (#545A6D) with transparent
# Leave all other fills untouched so the portrait renders correctly
$clean = $svg -replace 'fill="#545A6D"', 'fill="transparent"'

$clean | Set-Content "public\figure-clean.svg" -Encoding UTF8
Write-Host "Done - figure-clean.svg created (transparent background, original colors)"
