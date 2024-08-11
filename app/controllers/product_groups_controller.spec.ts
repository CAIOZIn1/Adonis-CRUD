import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('Create product group', () => {
  it('should be able to create a product group', async () => {
    const response = await request('http://localhost:3333').post('/createGroup').send({
      name: 'Legumes',
    })

    const result = JSON.parse(response.text).success
    const id = JSON.parse(response.text).id

    expect(response.status).toBe(200)
    expect(result).toBe(true)
    expect(id).toEqual(expect.any(String))
  })

  it('should not be able to create a product group with invalid values', async () => {
    const response = await request('http://localhost:3333').post('/createGroup').send({
      name: 12345, // --> aqui deveria ser string
    })

    expect(response.status).toBe(400)
  })
})

describe('Show product group', () => {
  it('should be able to show a product group', async () => {
    const response = await request('http://localhost:3333').get(
      '/group/50ba226f-d066-425b-bb57-84326a5ee648'
    )

    const product = JSON.parse(response.text).findedProduct

    expect(response.status).toBe(200)
    expect(product).toBeTruthy()
  })

  it('should not be able to show a nonexistent product group', async () => {
    const response = await request('http://localhost:3333').get(`/group/nonexistent-id`)

    const product = JSON.parse(response.text).findedProduct

    expect(response.status).toBe(200)
    expect(product).toBeUndefined()
  })
})

describe('Update product group', () => {
  it('should be able to update a product group', async () => {
    const response = await request('http://localhost:3333')
      .put('/group/50ba226f-d066-425b-bb57-84326a5ee648')
      .send({
        name: 'Vegetais',
      })

    expect(response.status).toBe(200)
  })

  it('should not be able to update a nonexistent product group', async () => {
    const response = await request('http://localhost:3333').put(`/group/nonexistent-id`).send({
      name: 'Vegetais',
    })

    const result = JSON.parse(response.text).success

    expect(response.status).toBe(200)
    expect(result).toBe(false)
  })
})

describe('Delete product group', () => {
  it('should be able to delete a product group', async () => {
    const response = await request('http://localhost:3333').delete(
      `/deleteGroup/50ba226f-d066-425b-bb57-84326a5ee648`
    )

    const result = JSON.parse(response.text).success

    expect(response.status).toBe(200)
    expect(result).toBe(true)
  })

  it('should not be able to delete a nonexistent product group', async () => {
    const response = await request('http://localhost:3333').delete(`/deleteGroup/nonexistent-id`)

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).success).toBe(false)
  })
})

describe('List all product groups', () => {
  it('should be able to list all product groups', async () => {
    await request('http://localhost:3333').post('/product-group').send({
      name: 'Frutas',
    })

    const response = await request('http://localhost:3333').get('/groups')

    const result = JSON.parse(response.text).products.length

    expect(response.status).toBe(200)
    expect(result).toBeGreaterThan(0)
  })
})
