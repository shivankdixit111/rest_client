import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class RequestHistory {
  @PrimaryKey()
  id!: number;
  
  @Property()
  method!: string;
  
  @Property()
  url!: string;
  
  @Property({ type:'json', nullable:true })
  headers?: Record<string,string>
  
  @Property({ type:'json', nullable:true })
  body?: Record<string,unknown>;

  @Property({ type:'json', nullable:true })
  response?: Record<string,unknown>;
  
  @Property({ onCreate: ()=> new Date() })
  createdAt: Date = new Date();
}