import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('Create product', () => {
  it('should be able to create a product', async () => {
    const response = await request('http://localhost:3333').post('/product').send({
      id: 'e9c71179-3685-4603-82c2-936f67bdb222',
      groupID: '50ba226f-d066-425b-bb57-84326a5ee648',
      name: 'Banana',
      qtd: 10,
    })

    expect(response.status).toBe(201)
  })

  it('should not be able to create a product with invalid values', async () => {
    const response = await request('http://localhost:3333').post('/product').send({
      id: 'e9c71179-3685-4603-82c2-936f67bdb222',
      groupID: '50ba226f-d066-425b-bb57-84326a5ee648',
      name: 15, // --> aqui deveria ser string
      qtd: 10,
    })

    expect(response.status).toBe(400)
  })
})

describe('Show prodruct', () => {
  it('should be able to show a product', async () => {
    const product = await request('http://localhost:3333').post('/product').send({
      id: 'e9c71179-3685-4603-82c2-936f67bdb222',
      groupID: '50ba226f-d066-425b-bb57-84326a5ee648',
      name: 'Banana',
      qtd: 10,
    })

    const id = JSON.parse(product.text).id

    const response = await request('http://localhost:3333').get(`/product/${id}`)

    expect(response.status).toBe(200)
  })

  it('should not be able to show a nonexistent product', async () => {
    const response = await request('http://localhost:3333').get(
      `/product/e9c71179-3685-4603-82c2-936f67bdb222`
    )

    const result = JSON.parse(response.text)

    expect(result.length).toEqual(undefined)
  })
})

describe('Update product', () => {
  it('should be able to update a product', async () => {
    const response = await request('http://localhost:3333')
      .put(`/product/49ab385a-df10-4105-aee2-3abb1c8f1b6a`)
      .send({
        name: 'Apple',
        qtd: 5,
        groupID: '50ba226f-d066-425b-bb57-84326a5ee648',
      })

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).success).toBe(true)
  })

  it('should not be able to update a nonexistent product', async () => {
    const response = await request('http://localhost:3333').put(`/product/nonexistent-id`).send({
      name: 'Apple',
      qtd: 5,
      groupID: '50ba226f-d066-425b-bb57-84326a5ee648',
    })

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).success).toBe(false)
  })
})

describe('Delete product', () => {
  it('should be able to delete a product', async () => {
    const response = await request('http://localhost:3333').delete(
      '/product/49ab385a-df10-4105-aee2-3abb1c8f1b6a'
    )

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).success).toBe(true)
  })

  it('should not be able to delete a nonexistent product', async () => {
    const response = await request('http://localhost:3333').delete(`/product/nonexistent-id`)

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).success).toBe(false)
  })
})

describe('List products by group', () => {
  it('should be able to list products by group', async () => {
    const response = await request('http://localhost:3333').get(
      `/products/group/50ba226f-d066-425b-bb57-84326a5ee648`
    )

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).findedProductsGroups).toBeTruthy()
  })

  it('should return empty if no products found in group', async () => {
    const response = await request('http://localhost:3333').get(
      `/products/group/nonexistent-group-id`
    )

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).findedProductsGroups).toBeUndefined()
  })
})
