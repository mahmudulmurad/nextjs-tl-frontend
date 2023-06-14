const login_url = `${process.env.API_URL}users/login`
const signup_url = `${process.env.API_URL}users/signup`
const all_products_url = `${process.env.API_URL}products/all-product`
const create_product = `${process.env.API_URL}products/create-product`
const product_update = (id:string | undefined) => `${process.env.API_URL}products/update/${id}`
const product_delete =(id: string) =>`${process.env.API_URL}products/delete/${id}`
const product_batch_delete = `${process.env.API_URL}products/batch-delete`

export {
    login_url,
    signup_url,
    all_products_url,
    create_product,
    product_update,
    product_delete,
    product_batch_delete
}