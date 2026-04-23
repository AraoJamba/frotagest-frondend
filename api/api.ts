import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getMotoristas() {
    const res = await fetch(`${API_URL}/motoristas`)
    return res.json()
}