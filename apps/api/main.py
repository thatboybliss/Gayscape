from fastapi import FastAPI
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Gayscape API - Real-time Engine Online"}
