$ErrorActionPreference = 'Stop'
Write-Host "Testing all routes..."
$base = "http://localhost:3000"
$routes = @(
  "/",
  "/founder",
  "/services/web-development",
  "/services/software-solutions",
  "/services/ai-integration",
  "/services/app-building",
  "/shubiq-studio",
  "/shubiq-labs",
  "/shubiq-labs/shubiq-flow",
  "/blog",
  "/blog/productivity-system-2026",
  "/blog/deep-focus-stack",
  "/blog/ai-workflows-for-teams",
  "/projects",
  "/projects/buildwithshubh",
  "/projects/portfolio",
  "/projects/shubhledger",
  "/projects/shubiq-flow",
  "/nonexistent-page-for-404-test"
)

foreach ($route in $routes) {
  $status = & curl.exe -s -o NUL -w "%{http_code}" -m 3 "$base$route"
  if ($status -eq "200" -or ($status -eq "404" -and $route -eq "/nonexistent-page-for-404-test")) {
    Write-Host "? $route — $status"
  } else {
    Write-Host "? $route — $status (NEEDS FIX)"
  }
}
Write-Host "Route testing complete."
