const login_url = `${process.env.API_URL}users/login`
const signup_url = `${process.env.API_URL}users/signup`
const all_products_url = `${process.env.API_URL}products/all-product`
const product_update = (id:string | undefined) => `${process.env.API_URL}products/update/${id}`
const create_product = `${process.env.API_URL}products/create-product`

export {
    login_url,
    signup_url,
    all_products_url,
    product_update,
    create_product
}