import { Iproducts } from '../interfaces/index.js'
import { randomUUID } from 'node:crypto'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  product: Iproducts[] = [
    {
      id: '49ab385a-df10-4105-aee2-3abb1c8f1b6a',
      groupID: '50ba226f-d066-425b-bb57-84326a5ee648',
      name: 'Maçã',
      qtd: 10,
    },
  ]

  async create({ request, response }: HttpContext) {
    try {
      const id = randomUUID()

      const { name, qtd, groupID } = request.all()

      this.product.push({ id, name, qtd, groupID })

      return response.send({ success: true, id })
    } catch (err) {
      console.error(err)
      return response.status(400).send({ error: 'Confira se não há nenhum valor faltando!' })
    }
  }

  async show({ request, response }: HttpContext) {
    const { id } = request.params()

    const findedProduct = this.product.find((product) => product.id === id)

    return response.send({ findedProduct })
  }

  async update({ request, response }: HttpContext) {
    const { id } = request.params()
    const { name, qtd, groupID } = request.all()

    const findedProduct = this.product.findIndex((product) => product.id === id)

    if (findedProduct === -1) {
      return response.send({ success: false })
    }

    this.product[findedProduct] = { groupID, id, name, qtd }

    return response.send({ success: true, id })
  }

  async delete({ request, response }: HttpContext) {
    const { id } = request.params()

    const findedProduct = this.product.findIndex((product) => product.id === id)

    if (findedProduct !== -1) {
      this.product.splice(findedProduct, 1)
      return response.send({ success: true, id })
    }

    return response.send({ success: false })
  }

  async listAll({ response }: HttpContext) {
    const products = this.product

    return response.send({ products })
  }

  async listGroup({ request, response }: HttpContext) {
    const { id } = request.params()

    const findedProductsGroups = this.product.find((product) => product.groupID === id)

    return response.send({ findedProductsGroups })
  }
}
