import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

const nullable = true

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 80 })
  email: string

  @Column({ length: 20 })
  username: string

  @Column({ nullable, type: 'text' })
  bio: null | string

  @Column({ nullable, type: 'text' })
  image: null | string
}
