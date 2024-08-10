import { IproductGroup } from '../interfaces/index.js'
import { randomUUID } from 'node:crypto'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsGroupController {
  product: IproductGroup[] = [
    {
      id: '50ba226f-d066-425b-bb57-84326a5ee648',
      name: 'Frutas',
    },
  ]

  async create({ request, response }: HttpContext) {
    try {
      const id = randomUUID()

      const { name } = request.all()

      this.product.push({ id, name })

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
    const { name } = request.all()

    const findedProduct = this.product.findIndex((product) => product.id === id)

    if (findedProduct === -1) {
      return response.send({ success: false })
    }

    this.product[findedProduct] = { id, name }

    return response.send({ findedProduct })
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
}
