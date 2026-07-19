$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    message = "potato price in kolkata market today"
    language = "English"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/chat" -Method POST -Headers $headers -Body $body -TimeoutSec 30
    Write-Host "API Response:"
    Write-Host $response.Content
} catch {
    Write-Host "Error calling API:"
    Write-Host $_.Exception.Message
    Write-Host $_.ErrorDetails.Message
}
