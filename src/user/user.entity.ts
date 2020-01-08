import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { cryptoPassword } from '../utils'

const nullable = true

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 80 })
  email: string

  @Column({ length: 20 })
  username: string

  @Column({ length: 64 })
  password: string

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword () {
    this.password = cryptoPassword(this.password)
  }

  @Column({ nullable, type: 'text' })
  bio: null | string

  @Column({ nullable, type: 'text' })
  image: null | string
}
