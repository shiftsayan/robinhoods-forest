const MARKET_ENDPOINT = "https://script.google.com/macros/s/AKfycbwdnILX8eati2yIezQcD2uAS5EOjxK1fqZeAFrtzVqFiLDkL0jbBfx5uJvmEw_yJKX4Hw/exec"

function getAllData() {
    const data = fetch(MARKET_ENDPOINT)
    console.log(data)
    return data
}

export { getAllData }