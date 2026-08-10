// prisma/seed.ts
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg as PrismaPg2 } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "node:path";
import { fileURLToPath } from "node:url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.9.1",
  "engineVersion": "e922089b7d7502aff4249d5da3420f6fa55fc6ad",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum UserRole {\n  USER\n  ADMIN\n}\n\nenum BookingType {\n  PICKUP\n  DROPOFF\n}\n\nenum BookingStatus {\n  PENDING\n  CONFIRMED\n  IN_PROGRESS\n  COMPLETED\n  CANCELLED\n}\n\nenum PaymentMethod {\n  CASH\n  MOBILE_MONEY\n  CARD\n  WHATSAPP\n}\n\nenum PaymentStatus {\n  PENDING\n  PAID\n  FAILED\n  REFUNDED\n}\n\nmodel User {\n  id            String    @id @default(cuid())\n  name          String?\n  email         String    @unique\n  phone         String?\n  passwordHash  String?\n  role          UserRole  @default(USER)\n  emailVerified DateTime?\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  bookings      Booking[]\n  accounts      Account[]\n  sessions      Session[]\n}\n\nmodel Account {\n  id                String  @id @default(cuid())\n  userId            String\n  type              String\n  provider          String\n  providerAccountId String\n  refresh_token     String? @db.Text\n  access_token      String? @db.Text\n  expires_at        Int?\n  token_type        String?\n  scope             String?\n  id_token          String? @db.Text\n  session_state     String?\n  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([provider, providerAccountId])\n}\n\nmodel Session {\n  id           String   @id @default(cuid())\n  sessionToken String   @unique\n  userId       String\n  expires      DateTime\n  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n}\n\nmodel VerificationToken {\n  identifier String\n  token      String   @unique\n  expires    DateTime\n\n  @@unique([identifier, token])\n}\n\nmodel Vehicle {\n  id          String    @id @default(cuid())\n  name        String\n  description String?\n  imageUrl    String?\n  capacity    Int\n  basePrice   Decimal   @db.Decimal(10, 2)\n  pricePerKm  Decimal   @default(0) @db.Decimal(10, 2)\n  isActive    Boolean   @default(true)\n  sortOrder   Int       @default(0)\n  createdAt   DateTime  @default(now())\n  updatedAt   DateTime  @updatedAt\n  bookings    Booking[]\n}\n\nmodel Media {\n  id           String     @id @default(cuid())\n  filename     String\n  originalName String\n  mimeType     String\n  size         Int\n  url          String     @unique\n  alt          String?\n  caption      String?\n  folder       String     @default("general")\n  createdAt    DateTime   @default(now())\n  updatedAt    DateTime   @updatedAt\n  blogPosts    BlogPost[]\n}\n\nmodel BlogPost {\n  id              String   @id @default(cuid())\n  slug            String   @unique\n  title           String\n  excerpt         String   @db.Text\n  category        String\n  publishedAt     DateTime\n  readTime        String   @default("5 min read")\n  imageUrl        String?\n  imageAlt        String?\n  imageMediaId    String?\n  imageMedia      Media?   @relation(fields: [imageMediaId], references: [id], onDelete: SetNull)\n  sections        Json\n  contentHtml     String?  @db.Text\n  isPublished     Boolean  @default(true)\n  metaTitle       String?\n  metaDescription String?  @db.Text\n  createdAt       DateTime @default(now())\n  updatedAt       DateTime @updatedAt\n\n  @@index([isPublished, publishedAt])\n}\n\nmodel Booking {\n  id                String        @id @default(cuid())\n  reference         String        @unique\n  userId            String?\n  user              User?         @relation(fields: [userId], references: [id], onDelete: SetNull)\n  vehicleId         String\n  vehicle           Vehicle       @relation(fields: [vehicleId], references: [id])\n  type              BookingType\n  status            BookingStatus @default(PENDING)\n  pickupLocation    String\n  dropoffLocation   String\n  pickupDate        DateTime\n  flightNumber      String?\n  passengerCount    Int\n  luggageCount      Int           @default(0)\n  customerName      String\n  customerEmail     String\n  customerPhone     String\n  specialRequests   String?\n  quotedPrice       Decimal       @db.Decimal(10, 2)\n  distanceKm        Decimal?      @db.Decimal(10, 2)\n  paymentMethod     PaymentMethod @default(WHATSAPP)\n  paymentStatus     PaymentStatus @default(PENDING)\n  paystackReference String?\n  adminNotes        String?\n  createdAt         DateTime      @default(now())\n  updatedAt         DateTime      @updatedAt\n\n  @@index([status])\n  @@index([pickupDate])\n  @@index([customerPhone])\n}\n\nmodel CmsPage {\n  id               String   @id @default(cuid())\n  slug             String   @unique\n  title            String\n  excerpt          String?  @db.Text\n  content          String   @db.Text\n  featuredImageUrl String?\n  featuredImageAlt String?\n  metaTitle        String?\n  metaDescription  String?  @db.Text\n  isPublished      Boolean  @default(true)\n  createdAt        DateTime @default(now())\n  updatedAt        DateTime @updatedAt\n}\n\nmodel SiteSetting {\n  id    String @id @default(cuid())\n  key   String @unique\n  value String @db.Text\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"passwordHash","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"emailVerified","kind":"scalar","type":"DateTime"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"}],"dbName":null},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"type","kind":"scalar","type":"String"},{"name":"provider","kind":"scalar","type":"String"},{"name":"providerAccountId","kind":"scalar","type":"String"},{"name":"refresh_token","kind":"scalar","type":"String"},{"name":"access_token","kind":"scalar","type":"String"},{"name":"expires_at","kind":"scalar","type":"Int"},{"name":"token_type","kind":"scalar","type":"String"},{"name":"scope","kind":"scalar","type":"String"},{"name":"id_token","kind":"scalar","type":"String"},{"name":"session_state","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":null},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"sessionToken","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"expires","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":null},"VerificationToken":{"fields":[{"name":"identifier","kind":"scalar","type":"String"},{"name":"token","kind":"scalar","type":"String"},{"name":"expires","kind":"scalar","type":"DateTime"}],"dbName":null},"Vehicle":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"capacity","kind":"scalar","type":"Int"},{"name":"basePrice","kind":"scalar","type":"Decimal"},{"name":"pricePerKm","kind":"scalar","type":"Decimal"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToVehicle"}],"dbName":null},"Media":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"filename","kind":"scalar","type":"String"},{"name":"originalName","kind":"scalar","type":"String"},{"name":"mimeType","kind":"scalar","type":"String"},{"name":"size","kind":"scalar","type":"Int"},{"name":"url","kind":"scalar","type":"String"},{"name":"alt","kind":"scalar","type":"String"},{"name":"caption","kind":"scalar","type":"String"},{"name":"folder","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"blogPosts","kind":"object","type":"BlogPost","relationName":"BlogPostToMedia"}],"dbName":null},"BlogPost":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"excerpt","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"publishedAt","kind":"scalar","type":"DateTime"},{"name":"readTime","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"imageAlt","kind":"scalar","type":"String"},{"name":"imageMediaId","kind":"scalar","type":"String"},{"name":"imageMedia","kind":"object","type":"Media","relationName":"BlogPostToMedia"},{"name":"sections","kind":"scalar","type":"Json"},{"name":"contentHtml","kind":"scalar","type":"String"},{"name":"isPublished","kind":"scalar","type":"Boolean"},{"name":"metaTitle","kind":"scalar","type":"String"},{"name":"metaDescription","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"reference","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"vehicleId","kind":"scalar","type":"String"},{"name":"vehicle","kind":"object","type":"Vehicle","relationName":"BookingToVehicle"},{"name":"type","kind":"enum","type":"BookingType"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"pickupLocation","kind":"scalar","type":"String"},{"name":"dropoffLocation","kind":"scalar","type":"String"},{"name":"pickupDate","kind":"scalar","type":"DateTime"},{"name":"flightNumber","kind":"scalar","type":"String"},{"name":"passengerCount","kind":"scalar","type":"Int"},{"name":"luggageCount","kind":"scalar","type":"Int"},{"name":"customerName","kind":"scalar","type":"String"},{"name":"customerEmail","kind":"scalar","type":"String"},{"name":"customerPhone","kind":"scalar","type":"String"},{"name":"specialRequests","kind":"scalar","type":"String"},{"name":"quotedPrice","kind":"scalar","type":"Decimal"},{"name":"distanceKm","kind":"scalar","type":"Decimal"},{"name":"paymentMethod","kind":"enum","type":"PaymentMethod"},{"name":"paymentStatus","kind":"enum","type":"PaymentStatus"},{"name":"paystackReference","kind":"scalar","type":"String"},{"name":"adminNotes","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"CmsPage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"excerpt","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"featuredImageUrl","kind":"scalar","type":"String"},{"name":"featuredImageAlt","kind":"scalar","type":"String"},{"name":"metaTitle","kind":"scalar","type":"String"},{"name":"metaDescription","kind":"scalar","type":"String"},{"name":"isPublished","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"SiteSetting":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"key","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","bookings","_count","vehicle","accounts","sessions","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","_avg","_sum","Account.groupBy","Account.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","VerificationToken.findUnique","VerificationToken.findUniqueOrThrow","VerificationToken.findFirst","VerificationToken.findFirstOrThrow","VerificationToken.findMany","VerificationToken.createOne","VerificationToken.createMany","VerificationToken.createManyAndReturn","VerificationToken.updateOne","VerificationToken.updateMany","VerificationToken.updateManyAndReturn","VerificationToken.upsertOne","VerificationToken.deleteOne","VerificationToken.deleteMany","VerificationToken.groupBy","VerificationToken.aggregate","Vehicle.findUnique","Vehicle.findUniqueOrThrow","Vehicle.findFirst","Vehicle.findFirstOrThrow","Vehicle.findMany","Vehicle.createOne","Vehicle.createMany","Vehicle.createManyAndReturn","Vehicle.updateOne","Vehicle.updateMany","Vehicle.updateManyAndReturn","Vehicle.upsertOne","Vehicle.deleteOne","Vehicle.deleteMany","Vehicle.groupBy","Vehicle.aggregate","imageMedia","blogPosts","Media.findUnique","Media.findUniqueOrThrow","Media.findFirst","Media.findFirstOrThrow","Media.findMany","Media.createOne","Media.createMany","Media.createManyAndReturn","Media.updateOne","Media.updateMany","Media.updateManyAndReturn","Media.upsertOne","Media.deleteOne","Media.deleteMany","Media.groupBy","Media.aggregate","BlogPost.findUnique","BlogPost.findUniqueOrThrow","BlogPost.findFirst","BlogPost.findFirstOrThrow","BlogPost.findMany","BlogPost.createOne","BlogPost.createMany","BlogPost.createManyAndReturn","BlogPost.updateOne","BlogPost.updateMany","BlogPost.updateManyAndReturn","BlogPost.upsertOne","BlogPost.deleteOne","BlogPost.deleteMany","BlogPost.groupBy","BlogPost.aggregate","Booking.findUnique","Booking.findUniqueOrThrow","Booking.findFirst","Booking.findFirstOrThrow","Booking.findMany","Booking.createOne","Booking.createMany","Booking.createManyAndReturn","Booking.updateOne","Booking.updateMany","Booking.updateManyAndReturn","Booking.upsertOne","Booking.deleteOne","Booking.deleteMany","Booking.groupBy","Booking.aggregate","CmsPage.findUnique","CmsPage.findUniqueOrThrow","CmsPage.findFirst","CmsPage.findFirstOrThrow","CmsPage.findMany","CmsPage.createOne","CmsPage.createMany","CmsPage.createManyAndReturn","CmsPage.updateOne","CmsPage.updateMany","CmsPage.updateManyAndReturn","CmsPage.upsertOne","CmsPage.deleteOne","CmsPage.deleteMany","CmsPage.groupBy","CmsPage.aggregate","SiteSetting.findUnique","SiteSetting.findUniqueOrThrow","SiteSetting.findFirst","SiteSetting.findFirstOrThrow","SiteSetting.findMany","SiteSetting.createOne","SiteSetting.createMany","SiteSetting.createManyAndReturn","SiteSetting.updateOne","SiteSetting.updateMany","SiteSetting.updateManyAndReturn","SiteSetting.upsertOne","SiteSetting.deleteOne","SiteSetting.deleteMany","SiteSetting.groupBy","SiteSetting.aggregate","AND","OR","NOT","id","key","value","equals","in","notIn","lt","lte","gt","gte","contains","startsWith","endsWith","not","slug","title","excerpt","content","featuredImageUrl","featuredImageAlt","metaTitle","metaDescription","isPublished","createdAt","updatedAt","reference","userId","vehicleId","BookingType","type","BookingStatus","status","pickupLocation","dropoffLocation","pickupDate","flightNumber","passengerCount","luggageCount","customerName","customerEmail","customerPhone","specialRequests","quotedPrice","distanceKm","PaymentMethod","paymentMethod","PaymentStatus","paymentStatus","paystackReference","adminNotes","category","publishedAt","readTime","imageUrl","imageAlt","imageMediaId","sections","contentHtml","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","filename","originalName","mimeType","size","url","alt","caption","folder","every","some","none","name","description","capacity","basePrice","pricePerKm","isActive","sortOrder","identifier","token","expires","identifier_token","sessionToken","provider","providerAccountId","refresh_token","access_token","expires_at","token_type","scope","id_token","session_state","email","phone","passwordHash","UserRole","role","emailVerified","image","provider_providerAccountId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "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-zAQAAyQIAMLQBAAA_ABC1AQAAyQIAMLYBAQCMAgAh0AEBAIwCACHTAQEAjAIAIY0CAQCMAgAhjgIBAIwCACGPAgEAkwIAIZACAQCTAgAhkQICAMoCACGSAgEAkwIAIZMCAQCTAgAhlAIBAJMCACGVAgEAkwIAIQMAAAALACABAAA-ADAaAAA_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-QECALwCACH6AQEAAAAB-wEBAJ4CACH8AQEAngIAIf0BAQCRAgAhAQAAAIoBACAVYQAAwAIAILMBAAC-AgAwtAEAAIwBABC1AQAAvgIAMLYBAQCRAgAhxAEBAJECACHFAQEAkQIAIcYBAQCRAgAhygEBAJ4CACHLAQEAngIAIcwBIACfAgAhzQFAAKACACHOAUAAoAIAIegBAQCRAgAh6QFAAKACACHqAQEAkQIAIesBAQCeAgAh7AEBAJ4CACHtAQEAngIAIe4BAAC_AgAg7wEBAJ4CACEHYQAAmgMAIMoBAADqAgAgywEAAOoCACDrAQAA6gIAIOwBAADqAgAg7QEAAOoCACDvAQAA6gIAIBVhAADAAgAgswEAAL4CADC0AQAAjAEAELUBAAC-AgAwtgEBAAAAAcQBAQAAAAHFAQEAkQIAIcYBAQCRAgAhygEBAJ4CACHLAQEAngIAIcwBIACfAgAhzQFAAKACACHOAUAAoAIAIegBAQCRAgAh6QFAAKACACHqAQEAkQIAIesBAQCeAgAh7AEBAJ4CACHtAQEAngIAIe4BAAC_AgAg7wEBAJ4CACEDAAAAjAEAIAEAAI0BADACAACOAQAgD2IAAL0CACCzAQAAuwIAMLQBAACQAQAQtQEAALsCADC2AQEAkQIAIc0BQACgAgAhzgFAAKACACH2AQEAkQIAIfcBAQCRAgAh-AEBAJECACH5AQIAvAIAIfoBAQCRAgAh-wEBAJ4CACH8AQEAngIAIf0BAQCRAgAhAQAAAJABACABAAAAjAEAIAEAAACKAQAgA2IAAJkDACD7AQAA6gIAIPwBAADqAgAgAwAAAJABACABAACUAQAwAgAAigEAIAMAAACQAQAgAQAAlAEAMAIAAIoBACADAAAAkAEAIAEAAJQBADACAACKAQAgDGIAAJgDACC2AQEAAAABzQFAAAAAAc4BQAAAAAH2AQEAAAAB9wEBAAAAAfgBAQAAAAH5AQIAAAAB-gEBAAAAAfsBAQAAAAH8AQEAAAAB_QEBAAAAAQEOAACYAQAgC7YBAQAAAAHNAUAAAAABzgFAAAAAAfYBAQAAAAH3AQEAAAAB-AEBAAAAAfkBAgAAAAH6AQEAAAAB-wEBAAAAAfwBAQAAAAH9AQEAAAABAQ4AAJoBADABDgAAmgEAMAxiAACLAwAgtgEBAOkCACHNAUAA8AIAIc4BQADwAgAh9gEBAOkCACH3AQEA6QIAIfgBAQDpAgAh-QECAPgCACH6AQEA6QIAIfsBAQDuAgAh_AEBAO4CACH9AQEA6QIAIQIAAACKAQAgDgAAnQEAIAu2AQEA6QIAIc0BQADwAgAhzgFAAPACACH2AQEA6QIAIfcBAQDpAgAh-AEBAOkCACH5AQIA-AIAIfoBAQDpAgAh-wEBAO4CACH8AQEA7gIAIf0BAQDpAgAhAgAAAJABACAOAACfAQAgAgAAAJABACAOAACfAQAgAwAAAIoBACAVAACYAQAgFgAAnQEAIAEAAACKAQAgAQAAAJABACAHBQAAhgMAIBsAAIkDACAcAACIAwAgLQAAhwMAIC4AAIoDACD7AQAA6gIAIPwBAADqAgAgDrMBAAC6AgAwtAEAAKYBABC1AQAAugIAMLYBAQCMAgAhzQFAAJUCACHOAUAAlQIAIfYBAQCMAgAh9wEBAIwCACH4AQEAjAIAIfkBAgCkAgAh-gEBAIwCACH7AQEAkwIAIfwBAQCTAgAh_QEBAIwCACEDAAAAkAEAIAEAAKUBADAaAACmAQAgAwAAAJABACABAACUAQAwAgAAigEAIAEAAACOAQAgAQAAAI4BACADAAAAjAEAIAEAAI0BADACAACOAQAgAwAAAIwBACABAACNAQAwAgAAjgEAIAMAAACMAQAgAQAAjQEAMAIAAI4BACASYQAAhQMAILYBAQAAAAHEAQEAAAABxQEBAAAAAcYBAQAAAAHKAQEAAAABywEBAAAAAcwBIAAAAAHNAUAAAAABzgFAAAAAAegBAQAAAAHpAUAAAAAB6gEBAAAAAesBAQAAAAHsAQEAAAAB7QEBAAAAAe4BgAAAAAHvAQEAAAABAQ4AAK4BACARtgEBAAAAAcQBAQAAAAHFAQEAAAABxgEBAAAAAcoBAQAAAAHLAQEAAAABzAEgAAAAAc0BQAAAAAHOAUAAAAAB6AEBAAAAAekBQAAAAAHqAQEAAAAB6wEBAAAAAewBAQAAAAHtAQEAAAAB7gGAAAAAAe8BAQAAAAEBDgAAsAEAMAEOAACwAQAwAQAAAJABACASYQAAhAMAILYBAQDpAgAhxAEBAOkCACHFAQEA6QIAIcYBAQDpAgAhygEBAO4CACHLAQEA7gIAIcwBIADvAgAhzQFAAPACACHOAUAA8AIAIegBAQDpAgAh6QFAAPACACHqAQEA6QIAIesBAQDuAgAh7AEBAO4CACHtAQEA7gIAIe4BgAAAAAHvAQEA7gIAIQIAAACOAQAgDgAAtAEAIBG2AQEA6QIAIcQBAQDpAgAhxQEBAOkCACHGAQEA6QIAIcoBAQDuAgAhywEBAO4CACHMASAA7wIAIc0BQADwAgAhzgFAAPACACHoAQEA6QIAIekBQADwAgAh6gEBAOkCACHrAQEA7gIAIewBAQDuAgAh7QEBAO4CACHuAYAAAAAB7wEBAO4CACECAAAAjAEAIA4AALYBACACAAAAjAEAIA4AALYBACABAAAAkAEAIAMAAACOAQAgFQAArgEAIBYAALQBACABAAAAjgEAIAEAAACMAQAgCQUAAIEDACAbAACDAwAgHAAAggMAIMoBAADqAgAgywEAAOoCACDrAQAA6gIAIOwBAADqAgAg7QEAAOoCACDvAQAA6gIAIBSzAQAAtwIAMLQBAAC-AQAQtQEAALcCADC2AQEAjAIAIcQBAQCMAgAhxQEBAIwCACHGAQEAjAIAIcoBAQCTAgAhywEBAJMCACHMASAAlAIAIc0BQACVAgAhzgFAAJUCACHoAQEAjAIAIekBQACVAgAh6gEBAIwCACHrAQEAkwIAIewBAQCTAgAh7QEBAJMCACHuAQAAuAIAIO8BAQCTAgAhAwAAAIwBACABAAC9AQAwGgAAvgEAIAMAAACMAQAgAQAAjQEAMAIAAI4BACABAAAABQAgAQAAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIBoDAAD_AgAgBgAAgAMAILYBAQAAAAHNAUAAAAABzgFAAAAAAc8BAQAAAAHQAQEAAAAB0QEBAAAAAdMBAAAA0wEC1QEAAADVAQLWAQEAAAAB1wEBAAAAAdgBQAAAAAHZAQEAAAAB2gECAAAAAdsBAgAAAAHcAQEAAAAB3QEBAAAAAd4BAQAAAAHfAQEAAAAB4AEQAAAAAeEBEAAAAAHjAQAAAOMBAuUBAAAA5QEC5gEBAAAAAecBAQAAAAEBDgAAxgEAIBi2AQEAAAABzQFAAAAAAc4BQAAAAAHPAQEAAAAB0AEBAAAAAdEBAQAAAAHTAQAAANMBAtUBAAAA1QEC1gEBAAAAAdcBAQAAAAHYAUAAAAAB2QEBAAAAAdoBAgAAAAHbAQIAAAAB3AEBAAAAAd0BAQAAAAHeAQEAAAAB3wEBAAAAAeABEAAAAAHhARAAAAAB4wEAAADjAQLlAQAAAOUBAuYBAQAAAAHnAQEAAAABAQ4AAMgBADABDgAAyAEAMAEAAAAHACAaAwAA_QIAIAYAAP4CACC2AQEA6QIAIc0BQADwAgAhzgFAAPACACHPAQEA6QIAIdABAQDuAgAh0QEBAOkCACHTAQAA9gLTASLVAQAA9wLVASLWAQEA6QIAIdcBAQDpAgAh2AFAAPACACHZAQEA7gIAIdoBAgD4AgAh2wECAPgCACHcAQEA6QIAId0BAQDpAgAh3gEBAOkCACHfAQEA7gIAIeABEAD5AgAh4QEQAPoCACHjAQAA-wLjASLlAQAA_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_AQAgA7YBAQDpAgAhtwEBAOkCACG4AQEA6QIAIQIAAAD1AQAgDgAAgQIAIAIAAAD1AQAgDgAAgQIAIAMAAADyAQAgFQAA-gEAIBYAAP8BACABAAAA8gEAIAEAAAD1AQAgAwUAAOYCACAbAADoAgAgHAAA5wIAIAazAQAAiwIAMLQBAACIAgAQtQEAAIsCADC2AQEAjAIAIbcBAQCMAgAhuAEBAIwCACEDAAAA9QEAIAEAAIcCADAaAACIAgAgAwAAAPUBACABAAD2AQAwAgAA8gEAIAazAQAAiwIAMLQBAACIAgAQtQEAAIsCADC2AQEAjAIAIbcBAQCMAgAhuAEBAIwCACEOBQAAjgIAIBsAAI8CACAcAACPAgAguQEBAAAAAboBAQAAAAS7AQEAAAAEvAEBAAAAAb0BAQAAAAG-AQEAAAABvwEBAAAAAcABAQAAAAHBAQEAAAABwgEBAAAAAcMBAQCNAgAhDgUAAI4CACAbAACPAgAgHAAAjwIAILkBAQAAAAG6AQEAAAAEuwEBAAAABLwBAQAAAAG9AQEAAAABvgEBAAAAAb8BAQAAAAHAAQEAAAABwQEBAAAAAcIBAQAAAAHDAQEAjQIAIQi5AQIAAAABugECAAAABLsBAgAAAAS8AQIAAAABvQECAAAAAb4BAgAAAAG_AQIAAAABwwECAI4CACELuQEBAAAAAboBAQAAAAS7AQEAAAAEvAEBAAAAAb0BAQAAAAG-AQEAAAABvwEBAAAAAcABAQAAAAHBAQEAAAABwgEBAAAAAcMBAQCPAgAhBrMBAACQAgAwtAEAAPUBABC1AQAAkAIAMLYBAQCRAgAhtwEBAJECACG4AQEAkQIAIQu5AQEAAAABugEBAAAABLsBAQAAAAS8AQEAAAABvQEBAAAAAb4BAQAAAAG_AQEAAAABwAEBAAAAAcEBAQAAAAHCAQEAAAABwwEBAI8CACEPswEAAJICADC0AQAA7wEAELUBAACSAgAwtgEBAIwCACHEAQEAjAIAIcUBAQCMAgAhxgEBAJMCACHHAQEAjAIAIcgBAQCTAgAhyQEBAJMCACHKAQEAkwIAIcsBAQCTAgAhzAEgAJQCACHNAUAAlQIAIc4BQACVAgAhDgUAAJsCACAbAACcAgAgHAAAnAIAILkBAQAAAAG6AQEAAAAFuwEBAAAABbwBAQAAAAG9AQEAAAABvgEBAAAAAb8BAQAAAAHAAQEAAAABwQEBAAAAAcIBAQAAAAHDAQEAmgIAIQUFAACOAgAgGwAAmQIAIBwAAJkCACC5ASAAAAABwwEgAJgCACELBQAAjgIAIBsAAJcCACAcAACXAgAguQFAAAAAAboBQAAAAAS7AUAAAAAEvAFAAAAAAb0BQAAAAAG-AUAAAAABvwFAAAAAAcMBQACWAgAhCwUAAI4CACAbAACXAgAgHAAAlwIAILkBQAAAAAG6AUAAAAAEuwFAAAAABLwBQAAAAAG9AUAAAAABvgFAAAAAAb8BQAAAAAHDAUAAlgIAIQi5AUAAAAABugFAAAAABLsBQAAAAAS8AUAAAAABvQFAAAAAAb4BQAAAAAG_AUAAAAABwwFAAJcCACEFBQAAjgIAIBsAAJkCACAcAACZAgAguQEgAAAAAcMBIACYAgAhArkBIAAAAAHDASAAmQIAIQ4FAACbAgAgGwAAnAIAIBwAAJwCACC5AQEAAAABugEBAAAABbsBAQAAAAW8AQEAAAABvQEBAAAAAb4BAQAAAAG_AQEAAAABwAEBAAAAAcEBAQAAAAHCAQEAAAABwwEBAJoCACEIuQECAAAAAboBAgAAAAW7AQIAAAAFvAECAAAAAb0BAgAAAAG-AQIAAAABvwECAAAAAcMBAgCbAgAhC7kBAQAAAAG6AQEAAAAFuwEBAAAABbwBAQAAAAG9AQEAAAABvgEBAAAAAb8BAQAAAAHAAQEAAAABwQEBAAAAAcIBAQAAAAHDAQEAnAIAIQ-zAQAAnQIAMLQBAADcAQAQtQEAAJ0CADC2AQEAkQIAIcQBAQCRAgAhxQEBAJECACHGAQEAngIAIccBAQCRAgAhyAEBAJ4CACHJAQEAngIAIcoBAQCeAgAhywEBAJ4CACHMASAAnwIAIc0BQACgAgAhzgFAAKACACELuQEBAAAAAboBAQAAAAW7AQEAAAAFvAEBAAAAAb0BAQAAAAG-AQEAAAABvwEBAAAAAcABAQAAAAHBAQEAAAABwgEBAAAAAcMBAQCcAgAhArkBIAAAAAHDASAAmQIAIQi5AUAAAAABugFAAAAABLsBQAAAAAS8AUAAAAABvQFAAAAAAb4BQAAAAAG_AUAAAAABwwFAAJcCACEbswEAAKECADC0AQAA1gEAELUBAAChAgAwtgEBAIwCACHNAUAAlQIAIc4BQACVAgAhzwEBAIwCACHQAQEAkwIAIdEBAQCMAgAh0wEAAKIC0wEi1QEAAKMC1QEi1gEBAIwCACHXAQEAjAIAIdgBQACVAgAh2QEBAJMCACHaAQIApAIAIdsBAgCkAgAh3AEBAIwCACHdAQEAjAIAId4BAQCMAgAh3wEBAJMCACHgARAApQIAIeEBEACmAgAh4wEAAKcC4wEi5QEAAKgC5QEi5gEBAJMCACHnAQEAkwIAIQcFAACOAgAgGwAAtgIAIBwAALYCACC5AQAAANMBAroBAAAA0wEIuwEAAADTAQjDAQAAtQLTASIHBQAAjgIAIBsAALQCACAcAAC0AgAguQEAAADVAQK6AQAAANUBCLsBAAAA1QEIwwEAALMC1QEiDQUAAI4CACAbAACOAgAgHAAAjgIAIC0AALICACAuAACOAgAguQECAAAAAboBAgAAAAS7AQIAAAAEvAECAAAAAb0BAgAAAAG-AQIAAAABvwECAAAAAcMBAgCxAgAhDQUAAI4CACAbAACwAgAgHAAAsAIAIC0AALACACAuAACwAgAguQEQAAAAAboBEAAAAAS7ARAAAAAEvAEQAAAAAb0BEAAAAAG-ARAAAAABvwEQAAAAAcMBEACvAgAhDQUAAJsCACAbAACuAgAgHAAArgIAIC0AAK4CACAuAACuAgAguQEQAAAAAboBEAAAAAW7ARAAAAAFvAEQAAAAAb0BEAAAAAG-ARAAAAABvwEQAAAAAcMBEACtAgAhBwUAAI4CACAbAACsAgAgHAAArAIAILkBAAAA4wECugEAAADjAQi7AQAAAOMBCMMBAACrAuMBIgcFAACOAgAgGwAAqgIAIBwAAKoCACC5AQAAAOUBAroBAAAA5QEIuwEAAADlAQjDAQAAqQLlASIHBQAAjgIAIBsAAKoCACAcAACqAgAguQEAAADlAQK6AQAAAOUBCLsBAAAA5QEIwwEAAKkC5QEiBLkBAAAA5QECugEAAADlAQi7AQAAAOUBCMMBAACqAuUBIgcFAACOAgAgGwAArAIAIBwAAKwCACC5AQAAAOMBAroBAAAA4wEIuwEAAADjAQjDAQAAqwLjASIEuQEAAADjAQK6AQAAAOMBCLsBAAAA4wEIwwEAAKwC4wEiDQUAAJsCACAbAACuAgAgHAAArgIAIC0AAK4CACAuAACuAgAguQEQAAAAAboBEAAAAAW7ARAAAAAFvAEQAAAAAb0BEAAAAAG-ARAAAAABvwEQAAAAAcMBEACtAgAhCLkBEAAAAAG6ARAAAAAFuwEQAAAABbwBEAAAAAG9ARAAAAABvgEQAAAAAb8BEAAAAAHDARAArgIAIQ0FAACOAgAgGwAAsAIAIBwAALACACAtAACwAgAgLgAAsAIAILkBEAAAAAG6ARAAAAAEuwEQAAAABLwBEAAAAAG9ARAAAAABvgEQAAAAAb8BEAAAAAHDARAArwIAIQi5ARAAAAABugEQAAAABLsBEAAAAAS8ARAAAAABvQEQAAAAAb4BEAAAAAG_ARAAAAABwwEQALACACENBQAAjgIAIBsAAI4CACAcAACOAgAgLQAAsgIAIC4AAI4CACC5AQIAAAABugECAAAABLsBAgAAAAS8AQIAAAABvQECAAAAAb4BAgAAAAG_AQIAAAABwwECALECACEIuQEIAAAAAboBCAAAAAS7AQgAAAAEvAEIAAAAAb0BCAAAAAG-AQgAAAABvwEIAAAAAcMBCACyAgAhBwUAAI4CACAbAAC0AgAgHAAAtAIAILkBAAAA1QECugEAAADVAQi7AQAAANUBCMMBAACzAtUBIgS5AQAAANUBAroBAAAA1QEIuwEAAADVAQjDAQAAtALVASIHBQAAjgIAIBsAALYCACAcAAC2AgAguQEAAADTAQK6AQAAANMBCLsBAAAA0wEIwwEAALUC0wEiBLkBAAAA0wECugEAAADTAQi7AQAAANMBCMMBAAC2AtMBIhSzAQAAtwIAMLQBAAC-AQAQtQEAALcCADC2AQEAjAIAIcQBAQCMAgAhxQEBAIwCACHGAQEAjAIAIcoBAQCTAgAhywEBAJMCACHMASAAlAIAIc0BQACVAgAhzgFAAJUCACHoAQEAjAIAIekBQACVAgAh6gEBAIwCACHrAQEAkwIAIewBAQCTAgAh7QEBAJMCACHuAQAAuAIAIO8BAQCTAgAhDwUAAI4CACAbAAC5AgAgHAAAuQIAILkBgAAAAAG8AYAAAAABvQGAAAAAAb4BgAAAAAG_AYAAAAABwwGAAAAAAfABAQAAAAHxAQEAAAAB8gEBAAAAAfMBgAAAAAH0AYAAAAAB9QGAAAAAAQy5AYAAAAABvAGAAAAAAb0BgAAAAAG-AYAAAAABvwGAAAAAAcMBgAAAAAHwAQEAAAAB8QEBAAAAAfIBAQAAAAHzAYAAAAAB9AGAAAAAAfUBgAAAAAEOswEAALoCADC0AQAApgEAELUBAAC6AgAwtgEBAIwCACHNAUAAlQIAIc4BQACVAgAh9gEBAIwCACH3AQEAjAIAIfgBAQCMAgAh-QECAKQCACH6AQEAjAIAIfsBAQCTAgAh_AEBAJMCACH9AQEAjAIAIQ9iAAC9AgAgswEAALsCADC0AQAAkAEAELUBAAC7AgAwtgEBAJECACHNAUAAoAIAIc4BQACgAgAh9gEBAJECACH3AQEAkQIAIfgBAQCRAgAh-QECALwCACH6AQEAkQIAIfsBAQCeAgAh_AEBAJ4CACH9AQEAkQIAIQi5AQIAAAABugECAAAABLsBAgAAAAS8AQIAAAABvQECAAAAAb4BAgAAAAG_AQIAAAABwwECAI4CACED_gEAAIwBACD_AQAAjAEAIIACAACMAQAgFWEAAMACACCzAQAAvgIAMLQBAACMAQAQtQEAAL4CADC2AQEAkQIAIcQBAQCRAgAhxQEBAJECACHGAQEAkQIAIcoBAQCeAgAhywEBAJ4CACHMASAAnwIAIc0BQACgAgAhzgFAAKACACHoAQEAkQIAIekBQACgAgAh6gEBAJECACHrAQEAngIAIewBAQCeAgAh7QEBAJ4CACHuAQAAvwIAIO8BAQCeAgAhDLkBgAAAAAG8AYAAAAABvQGAAAAAAb4BgAAAAAG_AYAAAAABwwGAAAAAAfABAQAAAAHxAQEAAAAB8gEBAAAAAfMBgAAAAAH0AYAAAAAB9QGAAAAAARFiAAC9AgAgswEAALsCADC0AQAAkAEAELUBAAC7AgAwtgEBAJECACHNAUAAoAIAIc4BQACgAgAh9gEBAJECACH3AQEAkQIAIfgBAQCRAgAh-QECALwCACH6AQEAkQIAIfsBAQCeAgAh_AEBAJ4CACH9AQEAkQIAIZ4CAACQAQAgnwIAAJABACAOswEAAMECADC0AQAAhwEAELUBAADBAgAwtgEBAIwCACHNAUAAlQIAIc4BQACVAgAh6wEBAJMCACGBAgEAjAIAIYICAQCTAgAhgwICAKQCACGEAhAApQIAIYUCEAClAgAhhgIgAJQCACGHAgIApAIAIQ8EAADEAgAgswEAAMICADC0AQAAdAAQtQEAAMICADC2AQEAkQIAIc0BQACgAgAhzgFAAKACACHrAQEAngIAIYECAQCRAgAhggIBAJ4CACGDAgIAvAIAIYQCEADDAgAhhQIQAMMCACGGAiAAnwIAIYcCAgC8AgAhCLkBEAAAAAG6ARAAAAAEuwEQAAAABLwBEAAAAAG9ARAAAAABvgEQAAAAAb8BEAAAAAHDARAAsAIAIQP-AQAAAwAg_wEAAAMAIIACAAADACAGswEAAMUCADC0AQAAbgAQtQEAAMUCADCIAgEAjAIAIYkCAQCMAgAhigJAAJUCACEGswEAAMYCADC0AQAAWwAQtQEAAMYCADCIAgEAkQIAIYkCAQCRAgAhigJAAKACACECiAIBAAAAAYkCAQAAAAEHswEAAMgCADC0AQAAVQAQtQEAAMgCADC2AQEAjAIAIdABAQCMAgAhigJAAJUCACGMAgEAjAIAIQ-zAQAAyQIAMLQBAAA_ABC1AQAAyQIAMLYBAQCMAgAh0AEBAIwCACHTAQEAjAIAIY0CAQCMAgAhjgIBAIwCACGPAgEAkwIAIZACAQCTAgAhkQICAMoCACGSAgEAkwIAIZMCAQCTAgAhlAIBAJMCACGVAgEAkwIAIQ0FAACbAgAgGwAAmwIAIBwAAJsCACAtAADMAgAgLgAAmwIAILkBAgAAAAG6AQIAAAAFuwECAAAABbwBAgAAAAG9AQIAAAABvgECAAAAAb8BAgAAAAHDAQIAywIAIQ0FAACbAgAgGwAAmwIAIBwAAJsCACAtAADMAgAgLgAAmwIAILkBAgAAAAG6AQIAAAAFuwECAAAABbwBAgAAAAG9AQIAAAABvgECAAAAAb8BAgAAAAHDAQIAywIAIQi5AQgAAAABugEIAAAABbsBCAAAAAW8AQgAAAABvQEIAAAAAb4BCAAAAAG_AQgAAAABwwEIAMwCACENswEAAM0CADC0AQAAKQAQtQEAAM0CADC2AQEAjAIAIc0BQACVAgAhzgFAAJUCACGBAgEAkwIAIZYCAQCMAgAhlwIBAJMCACGYAgEAkwIAIZoCAADOApoCIpsCQADPAgAhnAIBAJMCACEHBQAAjgIAIBsAANMCACAcAADTAgAguQEAAACaAgK6AQAAAJoCCLsBAAAAmgIIwwEAANICmgIiCwUAAJsCACAbAADRAgAgHAAA0QIAILkBQAAAAAG6AUAAAAAFuwFAAAAABbwBQAAAAAG9AUAAAAABvgFAAAAAAb8BQAAAAAHDAUAA0AIAIQsFAACbAgAgGwAA0QIAIBwAANECACC5AUAAAAABugFAAAAABbsBQAAAAAW8AUAAAAABvQFAAAAAAb4BQAAAAAG_AUAAAAABwwFAANACACEIuQFAAAAAAboBQAAAAAW7AUAAAAAFvAFAAAAAAb0BQAAAAAG-AUAAAAABvwFAAAAAAcMBQADRAgAhBwUAAI4CACAbAADTAgAgHAAA0wIAILkBAAAAmgICugEAAACaAgi7AQAAAJoCCMMBAADSApoCIgS5AQAAAJoCAroBAAAAmgIIuwEAAACaAgjDAQAA0wKaAiIIAwAA1QIAILMBAADUAgAwtAEAAA8AELUBAADUAgAwtgEBAJECACHQAQEAkQIAIYoCQACgAgAhjAIBAJECACESBAAAxAIAIAcAANwCACAIAADdAgAgswEAANkCADC0AQAABwAQtQEAANkCADC2AQEAkQIAIc0BQACgAgAhzgFAAKACACGBAgEAngIAIZYCAQCRAgAhlwIBAJ4CACGYAgEAngIAIZoCAADaApoCIpsCQADbAgAhnAIBAJ4CACGeAgAABwAgnwIAAAcAIAKNAgEAAAABjgIBAAAAARADAADVAgAgswEAANcCADC0AQAACwAQtQEAANcCADC2AQEAkQIAIdABAQCRAgAh0wEBAJECACGNAgEAkQIAIY4CAQCRAgAhjwIBAJ4CACGQAgEAngIAIZECAgDYAgAhkgIBAJ4CACGTAgEAngIAIZQCAQCeAgAhlQIBAJ4CACEIuQECAAAAAboBAgAAAAW7AQIAAAAFvAECAAAAAb0BAgAAAAG-AQIAAAABvwECAAAAAcMBAgCbAgAhEAQAAMQCACAHAADcAgAgCAAA3QIAILMBAADZAgAwtAEAAAcAELUBAADZAgAwtgEBAJECACHNAUAAoAIAIc4BQACgAgAhgQIBAJ4CACGWAgEAkQIAIZcCAQCeAgAhmAIBAJ4CACGaAgAA2gKaAiKbAkAA2wIAIZwCAQCeAgAhBLkBAAAAmgICugEAAACaAgi7AQAAAJoCCMMBAADTApoCIgi5AUAAAAABugFAAAAABbsBQAAAAAW8AUAAAAABvQFAAAAAAb4BQAAAAAG_AUAAAAABwwFAANECACED_gEAAAsAIP8BAAALACCAAgAACwAgA_4BAAAPACD_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_AgAg7wEBAJ4CACEUswEAAJMDADC0AQAAlAMAELUBAACTAwAwtgEBAJECACHEAQEAkQIAIcUBAQCRAgAhxgEBAJECACHKAQEAngIAIcsBAQCeAgAhzAEgAJ8CACHNAUAAoAIAIc4BQACgAgAh6AEBAJECACHpAUAAoAIAIeoBAQCRAgAh6wEBAJ4CACHsAQEAngIAIe0BAQCeAgAh7gEAAL8CACDvAQEAngIAIRC2AQEA6QIAIcQBAQDpAgAhxQEBAOkCACHGAQEA6QIAIcoBAQDuAgAhywEBAO4CACHMASAA7wIAIc0BQADwAgAhzgFAAPACACHoAQEA6QIAIekBQADwAgAh6gEBAOkCACHrAQEA7gIAIewBAQDuAgAh7gGAAAAAAe8BAQDuAgAhELYBAQDpAgAhxAEBAOkCACHFAQEA6QIAIcYBAQDpAgAhygEBAO4CACHLAQEA7gIAIcwBIADvAgAhzQFAAPACACHOAUAA8AIAIegBAQDpAgAh6QFAAPACACHqAQEA6QIAIesBAQDuAgAh7AEBAO4CACHuAYAAAAAB7wEBAO4CACEQtgEBAAAAAcQBAQAAAAHFAQEAAAABxgEBAAAAAcoBAQAAAAHLAQEAAAABzAEgAAAAAc0BQAAAAAHOAUAAAAAB6AEBAAAAAekBQAAAAAHqAQEAAAAB6wEBAAAAAewBAQAAAAHuAYAAAAAB7wEBAAAAAQQVAACMAwAwoAIAAI0DADCiAgAAjwMAIKYCAACQAwAwAANiAACZAwAg-wEAAOoCACD8AQAA6gIAIAAAAAAACxUAAKEDADAWAACmAwAwoAIAAKIDADChAgAAowMAMKICAACkAwAgowIAAKUDADCkAgAApQMAMKUCAAClAwAwpgIAAKUDADCnAgAApwMAMKgCAACoAwAwGAMAAP8CACC2AQEAAAABzQFAAAAAAc4BQAAAAAHPAQEAAAAB0AEBAAAAAdMBAAAA0wEC1QEAAADVAQLWAQEAAAAB1wEBAAAAAdgBQAAAAAHZAQEAAAAB2gECAAAAAdsBAgAAAAHcAQEAAAAB3QEBAAAAAd4BAQAAAAHfAQEAAAAB4AEQAAAAAeEBEAAAAAHjAQAAAOMBAuUBAAAA5QEC5gEBAAAAAecBAQAAAAECAAAABQAgFQAArAMAIAMAAAAFACAVAACsAwAgFgAAqwMAIAEOAAD8AwAwHQMAAOQCACAGAADlAgAgswEAAN4CADC0AQAAAwAQtQEAAN4CADC2AQEAAAABzQFAAKACACHOAUAAoAIAIc8BAQAAAAHQAQEAngIAIdEBAQCRAgAh0wEAAN8C0wEi1QEAAOAC1QEi1gEBAJECACHXAQEAkQIAIdgBQACgAgAh2QEBAJ4CACHaAQIAvAIAIdsBAgC8AgAh3AEBAJECACHdAQEAkQIAId4BAQCRAgAh3wEBAJ4CACHgARAAwwIAIeEBEADhAgAh4wEAAOIC4wEi5QEAAOMC5QEi5gEBAJ4CACHnAQEAngIAIQIAAAAFACAOAACrAwAgAgAAAKkDACAOAACqAwAgG7MBAACoAwAwtAEAAKkDABC1AQAAqAMAMLYBAQCRAgAhzQFAAKACACHOAUAAoAIAIc8BAQCRAgAh0AEBAJ4CACHRAQEAkQIAIdMBAADfAtMBItUBAADgAtUBItYBAQCRAgAh1wEBAJECACHYAUAAoAIAIdkBAQCeAgAh2gECALwCACHbAQIAvAIAIdwBAQCRAgAh3QEBAJECACHeAQEAkQIAId8BAQCeAgAh4AEQAMMCACHhARAA4QIAIeMBAADiAuMBIuUBAADjAuUBIuYBAQCeAgAh5wEBAJ4CACEbswEAAKgDADC0AQAAqQMAELUBAACoAwAwtgEBAJECACHNAUAAoAIAIc4BQACgAgAhzwEBAJECACHQAQEAngIAIdEBAQCRAgAh0wEAAN8C0wEi1QEAAOAC1QEi1gEBAJECACHXAQEAkQIAIdgBQACgAgAh2QEBAJ4CACHaAQIAvAIAIdsBAgC8AgAh3AEBAJECACHdAQEAkQIAId4BAQCRAgAh3wEBAJ4CACHgARAAwwIAIeEBEADhAgAh4wEAAOIC4wEi5QEAAOMC5QEi5gEBAJ4CACHnAQEAngIAIRe2AQEA6QIAIc0BQADwAgAhzgFAAPACACHPAQEA6QIAIdABAQDuAgAh0wEAAPYC0wEi1QEAAPcC1QEi1gEBAOkCACHXAQEA6QIAIdgBQADwAgAh2QEBAO4CACHaAQIA-AIAIdsBAgD4AgAh3AEBAOkCACHdAQEA6QIAId4BAQDpAgAh3wEBAO4CACHgARAA-QIAIeEBEAD6AgAh4wEAAPsC4wEi5QEAAPwC5QEi5gEBAO4CACHnAQEA7gIAIRgDAAD9AgAgtgEBAOkCACHNAUAA8AIAIc4BQADwAgAhzwEBAOkCACHQAQEA7gIAIdMBAAD2AtMBItUBAAD3AtUBItYBAQDpAgAh1wEBAOkCACHYAUAA8AIAIdkBAQDuAgAh2gECAPgCACHbAQIA-AIAIdwBAQDpAgAh3QEBAOkCACHeAQEA6QIAId8BAQDuAgAh4AEQAPkCACHhARAA-gIAIeMBAAD7AuMBIuUBAAD8AuUBIuYBAQDuAgAh5wEBAO4CACEYAwAA_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gAh0wEAAPYC0wEi1QEAAPcC1QEi1gEBAOkCACHXAQEA6QIAIdgBQADwAgAh2QEBAO4CACHaAQIA-AIAIdsBAgD4AgAh3AEBAOkCACHdAQEA6QIAId4BAQDpAgAh3wEBAO4CACHgARAA-QIAIeEBEAD6AgAh4wEAAPsC4wEi5QEAAPwC5QEi5gEBAO4CACHnAQEA7gIAIRgGAAD-AgAgtgEBAOkCACHNAUAA8AIAIc4BQADwAgAhzwEBAOkCACHRAQEA6QIAIdMBAAD2AtMBItUBAAD3AtUBItYBAQDpAgAh1wEBAOkCACHYAUAA8AIAIdkBAQDuAgAh2gECAPgCACHbAQIA-AIAIdwBAQDpAgAh3QEBAOkCACHeAQEA6QIAId8BAQDuAgAh4AEQAPkCACHhARAA-gIAIeMBAAD7AuMBIuUBAAD8AuUBIuYBAQDuAgAh5wEBAO4CACEYBgAAgAMAILYBAQAAAAHNAUAAAAABzgFAAAAAAc8BAQAAAAHRAQEAAAAB0wEAAADTAQLVAQAAANUBAtYBAQAAAAHXAQEAAAAB2AFAAAAAAdkBAQAAAAHaAQIAAAAB2wECAAAAAdwBAQAAAAHdAQEAAAAB3gEBAAAAAd8BAQAAAAHgARAAAAAB4QEQAAAAAeMBAAAA4wEC5QEAAADlAQLmAQEAAAAB5wEBAAAAAQQVAADfAwAwoAIAAOADADCiAgAA4gMAIKYCAAClAwAwBBUAANMDADCgAgAA1AMAMKICAADWAwAgpgIAANcDADAEFQAAxwMAMKACAADIAwAwogIAAMoDACCmAgAAywMAMAAACAQAAK4DACAHAADrAwAgCAAA7AMAIIECAADqAgAglwIAAOoCACCYAgAA6gIAIJsCAADqAgAgnAIAAOoCACADBAAArgMAIOsBAADqAgAgggIAAOoCACAXtgEBAAAAAc0BQAAAAAHOAUAAAAABzwEBAAAAAdEBAQAAAAHTAQAAANMBAtUBAAAA1QEC1gEBAAAAAdcBAQAAAAHYAUAAAAAB2QEBAAAAAdoBAgAAAAHbAQIAAAAB3AEBAAAAAd0BAQAAAAHeAQEAAAAB3wEBAAAAAeABEAAAAAHhARAAAAAB4wEAAADjAQLlAQAAAOUBAuYBAQAAAAHnAQEAAAABC7YBAQAAAAHTAQEAAAABjQIBAAAAAY4CAQAAAAGPAgEAAAABkAIBAAAAAZECAgAAAAGSAgEAAAABkwIBAAAAAZQCAQAAAAGVAgEAAAABA7YBAQAAAAGKAkAAAAABjAIBAAAAAQwEAADoAwAgCAAA6gMAILYBAQAAAAHNAUAAAAABzgFAAAAAAYECAQAAAAGWAgEAAAABlwIBAAAAAZgCAQAAAAGaAgAAAJoCApsCQAAAAAGcAgEAAAABAgAAAAEAIBUAAPIDACADAAAABwAgFQAA8gMAIBYAAPYDACAOAAAABwAgBAAAxAMAIAgAAMYDACAOAAD2AwAgtgEBAOkCACHNAUAA8AIAIc4BQADwAgAhgQIBAO4CACGWAgEA6QIAIZcCAQDuAgAhmAIBAO4CACGaAgAAwgOaAiKbAkAAwwMAIZwCAQDuAgAhDAQAAMQDACAIAADGAwAgtgEBAOkCACHNAUAA8AIAIc4BQADwAgAhgQIBAO4CACGWAgEA6QIAIZcCAQDuAgAhmAIBAO4CACGaAgAAwgOaAiKbAkAAwwMAIZwCAQDuAgAhDAQAAOgDACAHAADpAwAgtgEBAAAAAc0BQAAAAAHOAUAAAAABgQIBAAAAAZYCAQAAAAGXAgEAAAABmAIBAAAAAZoCAAAAmgICmwJAAAAAAZwCAQAAAAECAAAAAQAgFQAA9wMAIAMAAAAHACAVAAD3AwAgFgAA-wMAIA4AAAAHACAEAADEAwAgBwAAxQMAIA4AAPsDACC2AQEA6QIAIc0BQADwAgAhzgFAAPACACGBAgEA7gIAIZYCAQDpAgAhlwIBAO4CACGYAgEA7gIAIZoCAADCA5oCIpsCQADDAwAhnAIBAO4CACEMBAAAxAMAIAcAAMUDACC2AQEA6QIAIc0BQADwAgAhzgFAAPACACGBAgEA7gIAIZYCAQDpAgAhlwIBAO4CACGYAgEA7gIAIZoCAADCA5oCIpsCQADDAwAhnAIBAO4CACEXtgEBAAAAAc0BQAAAAAHOAUAAAAABzwEBAAAAAdABAQAAAAHTAQAAANMBAtUBAAAA1QEC1gEBAAAAAdcBAQAAAAHYAUAAAAAB2QEBAAAAAdoBAgAAAAHbAQIAAAAB3AEBAAAAAd0BAQAAAAHeAQEAAAAB3wEBAAAAAeABEAAAAAHhARAAAAAB4wEAAADjAQLlAQAAAOUBAuYBAQAAAAHnAQEAAAABELYBAQAAAAHEAQEAAAABxQEBAAAAAcYBAQAAAAHKAQEAAAABywEBAAAAAcwBIAAAAAHNAUAAAAABzgFAAAAAAegBAQAAAAHpAUAAAAAB6gEBAAAAAesBAQAAAAHsAQEAAAAB7gGAAAAAAe8BAQAAAAELtgEBAAAAAc0BQAAAAAHOAUAAAAAB9gEBAAAAAfcBAQAAAAH4AQEAAAAB-QECAAAAAfoBAQAAAAH7AQEAAAAB_AEBAAAAAf0BAQAAAAECAAAAigEAIBUAAP4DACADAAAAkAEAIBUAAP4DACAWAACCBAAgDQAAAJABACAOAACCBAAgtgEBAOkCACHNAUAA8AIAIc4BQADwAgAh9gEBAOkCACH3AQEA6QIAIfgBAQDpAgAh-QECAPgCACH6AQEA6QIAIfsBAQDuAgAh_AEBAO4CACH9AQEA6QIAIQu2AQEA6QIAIc0BQADwAgAhzgFAAPACACH2AQEA6QIAIfcBAQDpAgAh-AEBAOkCACH5AQIA-AIAIfoBAQDpAgAh-wEBAO4CACH8AQEA7gIAIf0BAQDpAgAhC7YBAQAAAAHNAUAAAAABzgFAAAAAAesBAQAAAAGBAgEAAAABggIBAAAAAYMCAgAAAAGEAhAAAAABhQIQAAAAAYYCIAAAAAGHAgIAAAABAgAAAHEAIBUAAIMEACAMBwAA6QMAIAgAAOoDACC2AQEAAAABzQFAAAAAAc4BQAAAAAGBAgEAAAABlgIBAAAAAZcCAQAAAAGYAgEAAAABmgIAAACaAgKbAkAAAAABnAIBAAAAAQIAAAABACAVAACFBAAgAwAAAHQAIBUAAIMEACAWAACJBAAgDQAAAHQAIA4AAIkEACC2AQEA6QIAIc0BQADwAgAhzgFAAPACACHrAQEA7gIAIYECAQDpAgAhggIBAO4CACGDAgIA-AIAIYQCEAD5AgAhhQIQAPkCACGGAiAA7wIAIYcCAgD4AgAhC7YBAQDpAgAhzQFAAPACACHOAUAA8AIAIesBAQDuAgAhgQIBAOkCACGCAgEA7gIAIYMCAgD4AgAhhAIQAPkCACGFAhAA-QIAIYYCIADvAgAhhwICAPgCACEDAAAABwAgFQAAhQQAIBYAAIwEACAOAAAABwAgBwAAxQMAIAgAAMYDACAOAACMBAAgtgEBAOkCACHNAUAA8AIAIc4BQADwAgAhgQIBAO4CACGWAgEA6QIAIZcCAQDuAgAhmAIBAO4CACGaAgAAwgOaAiKbAkAAwwMAIZwCAQDuAgAhDAcAAMUDACAIAADGAwAgtgEBAOkCACHNAUAA8AIAIc4BQADwAgAhgQIBAO4CACGWAgEA6QIAIZcCAQDuAgAhmAIBAO4CACGaAgAAwgOaAiKbAkAAwwMAIZwCAQDuAgAhBAQGAgUABwcOBQgSBgIDCAEGAAMCBAkCBQAEAQQKAAEDAAEBAwABAwQTAAcUAAgVAAAAAAMFAAwbAA0cAA4AAAADBQAMGwANHAAOAQMAAQEDAAEFBQATGwAWHAAXLQAULgAVAAAAAAAFBQATGwAWHAAXLQAULgAVAQMAAQEDAAEDBQAcGwAdHAAeAAAAAwUAHBsAHRwAHgAAAAMFACQbACUcACYAAAADBQAkGwAlHAAmAAAFBQArGwAuHAAvLQAsLgAtAAAAAAAFBQArGwAuHAAvLQAsLgAtAgUAM2KPATIBYZEBMQFikgEAAAAFBQA3GwA6HAA7LQA4LgA5AAAAAAAFBQA3GwA6HAA7LQA4LgA5AWGzATEBYbkBMQMFAEAbAEEcAEIAAAADBQBAGwBBHABCAgPLAQEGAAMCA9EBAQYAAwUFAEcbAEocAEstAEguAEkAAAAAAAUFAEcbAEocAEstAEguAEkAAAADBQBRGwBSHABTAAAAAwUAURsAUhwAUwAAAAMFAFkbAFocAFsAAAADBQBZGwBaHABbCQIBChYBCxgBDBkBDRoBDxwBEB4IER8JEiEBEyMIFCQKFyUBGCYBGScIHSoLHisPHywFIC0FIS4FIi8FIzAFJDIFJTQIJjUQJzcFKDkIKToRKjsFKzwFLD0IL0ASMEEYMUIGMkMGM0QGNEUGNUYGNkgGN0oIOEsZOU0GOk8IO1AaPFEGPVIGPlMIP1YbQFcfQVkgQlogQ10gRF4gRV8gRmEgR2MISGQhSWYgSmgIS2kiTGogTWsgTmwIT28jUHAnUXIDUnMDU3YDVHcDVXgDVnoDV3wIWH0oWX8DWoEBCFuCASlcgwEDXYQBA16FAQhfiAEqYIkBMGOLATFkkwExZZUBMWaWATFnlwExaJkBMWmbAQhqnAE0a54BMWygAQhtoQE1bqIBMW-jATFwpAEIcacBNnKoATxzqQEydKoBMnWrATJ2rAEyd60BMnivATJ5sQEIerIBPXu1ATJ8twEIfbgBPn66ATJ_uwEygAG8AQiBAb8BP4IBwAFDgwHBAQKEAcIBAoUBwwEChgHEAQKHAcUBAogBxwECiQHJAQiKAcoBRIsBzQECjAHPAQiNAdABRY4B0gECjwHTAQKQAdQBCJEB1wFGkgHYAUyTAdoBTZQB2wFNlQHeAU2WAd8BTZcB4AFNmAHiAU2ZAeQBCJoB5QFOmwHnAU2cAekBCJ0B6gFPngHrAU2fAewBTaAB7QEIoQHwAVCiAfEBVKMB8wFVpAH0AVWlAfcBVaYB-AFVpwH5AVWoAfsBVakB_QEIqgH-AVarAYACVawBggIIrQGDAleuAYQCVa8BhQJVsAGGAgixAYkCWLIBigJc"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("node:buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/blog-images.ts
var BLOG_IMAGES = {
  "kotoka-airport-to-hotel-accra": {
    image: "/images/blog/blog-kotoka-to-hotel.png",
    imageAlt: "Chauffeured airport transfer from Kotoka International to Accra hotels"
  },
  "first-timers-guide-accra-airport": {
    image: "/images/blog/blog-first-timers-accra.png",
    imageAlt: "First-time traveller meet-and-greet at Kotoka International Airport"
  },
  "kotoka-airport-to-east-legon": {
    image: "/images/blog/blog-east-legon.png",
    imageAlt: "Private SUV transfer from Kotoka Airport to East Legon Accra"
  },
  "kotoka-to-cantonments-osu-labone": {
    image: "/images/blog/blog-cantonments-osu.png",
    imageAlt: "Executive sedan transfer to Cantonments and Osu Accra"
  },
  "airport-taxi-vs-private-transfer-accra": {
    image: "/images/blog/blog-taxi-vs-private.png",
    imageAlt: "Comparing airport taxi and private chauffeur service in Accra"
  },
  "kotoka-terminal-3-meet-and-greet": {
    image: "/images/blog/blog-terminal-3-meet-greet.png",
    imageAlt: "Terminal 3 arrivals hall meet-and-greet service at Kotoka Airport"
  },
  "kotoka-airport-to-tema": {
    image: "/images/blog/blog-kotoka-to-tema.png",
    imageAlt: "Luxury van transfer from Kotoka Airport to Tema Ghana"
  },
  "corporate-airport-transfer-accra": {
    image: "/images/blog/blog-corporate-transfer.png",
    imageAlt: "Corporate executive airport transfer fleet in Accra Ghana"
  },
  "accra-airport-transfer-prices-2026": {
    image: "/images/blog/blog-transfer-prices.png",
    imageAlt: "Fixed fare airport transfer pricing Accra Ghana 2026"
  },
  "kotoka-airport-hotel-transfers-marriott-kempinski": {
    image: "/images/blog/blog-hotel-marriott-kempinski.png",
    imageAlt: "Hotel transfer from Kotoka to Marriott and Kempinski Accra"
  }
};
function getBlogImageMeta(slug, fallbackTitle) {
  return BLOG_IMAGES[slug] ?? {
    image: "/images/blog/blog-kotoka-to-hotel.png",
    imageAlt: fallbackTitle
  };
}

// src/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
var globalForPrisma = globalThis;
function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const adapter2 = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter: adapter2,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });
}
var prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// src/lib/blog.ts
function withImages(posts) {
  return posts.map((post) => {
    const { image, imageAlt } = getBlogImageMeta(post.slug, post.title);
    return { ...post, image, imageAlt };
  });
}
var RAW_BLOG_POSTS = [
  {
    slug: "kotoka-airport-to-hotel-accra",
    title: "How to Get from Kotoka Airport to Your Hotel in Accra",
    excerpt: "Everything first-time visitors need to know about airport transfers, taxis, ride-hailing, and chauffeur services from Kotoka International Airport.",
    category: "Airport Transfers",
    publishedAt: "2026-06-22",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Arriving at Kotoka International Airport (ACC) for the first time can feel overwhelming. Between customs, baggage reclaim, and the crowd at the arrivals exit, the last thing you want is uncertainty about how you'll reach your hotel.",
          "The good news: with a little planning before you land, your transfer can be the smoothest part of your entire journey."
        ]
      },
      {
        heading: "Your options from Kotoka Airport",
        bullets: [
          "Official airport taxis \u2014 available at the rank, but fares are often negotiated on the spot and quality varies",
          "Ride-hailing apps \u2014 convenient in central Accra, but surge pricing and airport pickup coordination can be inconsistent after long flights",
          "Hotel shuttle \u2014 only if your property offers one, often at fixed times",
          "Pre-booked private transfer \u2014 fixed price, flight tracking, meet-and-greet in arrivals, and direct door-to-door service"
        ]
      },
      {
        heading: "Why pre-booking is the safest choice",
        paragraphs: [
          "For business travellers, families, and first-time visitors, a pre-booked chauffeured transfer removes every variable. Your driver monitors your flight in real time, waits in the arrivals hall with a personalised name board, assists with luggage, and drives you directly to your hotel \u2014 Accra Marriott, Kempinski, Labadi Beach Hotel, or any address across Greater Accra.",
          "With AeroLink Ghana, the fare is calculated and confirmed before you fly. Pay securely online via Paystack, or confirm via WhatsApp. No negotiating after a fourteen-hour flight."
        ]
      },
      {
        heading: "Popular routes and what to expect",
        bullets: [
          "Kotoka \u2192 Airport Residential / East Legon: 20\u201335 minutes depending on traffic",
          "Kotoka \u2192 Osu / Labone / Cantonments: 25\u201340 minutes",
          "Kotoka \u2192 Tema: 45\u201370 minutes",
          "All AeroLink pickups include 60 minutes complimentary waiting from touchdown"
        ]
      },
      {
        heading: "Book before you board",
        paragraphs: [
          "Reserve your transfer at aerolinkghana.com/book before departure. Enter your flight number, destination, and vehicle preference \u2014 your quote is instant and guaranteed."
        ]
      }
    ]
  },
  {
    slug: "first-timers-guide-accra-airport",
    title: "The First-Timer's Guide to Accra Airport Transfers",
    excerpt: "Your cheat sheet to touchdown smoothly in Accra \u2014 flight tracking, terminal tips, and how to reach your destination stress-free.",
    category: "Travel Tips",
    publishedAt: "2026-06-17",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Kotoka International Airport is Ghana's main gateway, located in the Airport City area roughly 10 kilometres from central Accra. Most international flights arrive at Terminal 3 \u2014 a modern facility with clear signage, but one that still rewards travellers who plan ahead."
        ]
      },
      {
        heading: "Step 1: Before you fly",
        bullets: [
          "Book your airport transfer in advance \u2014 do not leave it to chance at arrivals",
          "Share your flight number so your chauffeur can track delays automatically",
          "Save your driver's WhatsApp contact from your confirmation email",
          "Confirm your hotel or residence address including any gate or building details"
        ]
      },
      {
        heading: "Step 2: Clearing the airport",
        paragraphs: [
          "After landing, proceed through immigration and collect your baggage. For Terminal 3 arrivals, exit into the main hall \u2014 your chauffeur will be waiting with a name board. If you cannot spot them immediately, check your confirmation for the direct contact number.",
          "Avoid unofficial agents offering transport inside the terminal. Your pre-booked driver is the safest option."
        ]
      },
      {
        heading: "Step 3: The journey into Accra",
        paragraphs: [
          "Accra traffic varies significantly by time of day. Morning and evening peaks can add twenty to thirty minutes to your journey. A professional chauffeur knows alternative routes through East Legon, Spintex, and the motorway \u2014 another reason to book with an experienced operator rather than navigating alone."
        ]
      },
      {
        heading: "What if my flight is delayed?",
        paragraphs: [
          "If you booked with AeroLink Ghana, we monitor your flight automatically. Your pickup time adjusts to your actual arrival \u2014 no need to call unless your plans change entirely. Sixty minutes of complimentary waiting is included from touchdown."
        ]
      }
    ]
  },
  {
    slug: "kotoka-airport-to-east-legon",
    title: "Kotoka Airport to East Legon: Routes, Times & Tips",
    excerpt: "A practical guide to private transfers from Kotoka International to East Legon, Airport Residential, and Trasacco Valley.",
    category: "Destination Guides",
    publishedAt: "2026-07-08",
    readTime: "4 min read",
    sections: [
      {
        paragraphs: [
          "East Legon is one of Accra's most popular residential and business districts for expatriates, diplomats, and returning Ghanaians. From embassies and serviced apartments to restaurants and corporate offices, it is among the most frequent destinations from Kotoka International Airport."
        ]
      },
      {
        heading: "Transfer time and distance",
        paragraphs: [
          "The drive from Kotoka to East Legon typically takes 20 to 35 minutes in light traffic, and up to 50 minutes during peak hours. The route usually follows the airport motorway before branching toward Legon, Trasacco, or American House depending on your exact address."
        ]
      },
      {
        heading: "Popular East Legon destinations we serve",
        bullets: [
          "Embassy Gardens & The Signature Apartments",
          "Trasacco Valley & Villagio",
          "American House & A&C Mall area",
          "East Legon residential estates",
          "Nearby: Airport Residential Area, Cantonments, Dzorwulu"
        ]
      },
      {
        heading: "Choosing the right vehicle",
        bullets: [
          "Executive Sedan \u2014 ideal for 1\u20133 passengers with standard luggage",
          "Premium SUV \u2014 extra space for families or multiple bags",
          "Luxury Van \u2014 groups of 6\u201310 with delegation luggage"
        ]
      },
      {
        heading: "Fixed pricing vs negotiating at the airport",
        paragraphs: [
          "Fares to East Legon vary by vehicle class but should be agreed before you travel. AeroLink provides instant online quotes \u2014 select East Legon as your destination on our booking page and see your fixed fare in seconds."
        ]
      }
    ]
  },
  {
    slug: "kotoka-to-cantonments-osu-labone",
    title: "Kotoka Airport to Cantonments, Osu & Labone: Transfer Guide",
    excerpt: "Private transfer times, routes, and tips from Kotoka International to Cantonments, Osu, Labone, and Ridge \u2014 Accra's premier hotel districts.",
    category: "Destination Guides",
    publishedAt: "2026-07-15",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Cantonments, Osu, and Labone form the heart of diplomatic and luxury hospitality in Accra. Whether you are staying at a boutique guesthouse on Oxford Street or a serviced apartment near the embassies, a pre-booked private transfer is the most reliable way to arrive from Kotoka International Airport."
        ]
      },
      {
        heading: "Typical journey times from Kotoka",
        bullets: [
          "Kotoka \u2192 Cantonments: 25\u201340 minutes",
          "Kotoka \u2192 Osu / Oxford Street: 30\u201345 minutes",
          "Kotoka \u2192 Labone: 30\u201345 minutes",
          "Kotoka \u2192 Ridge: 20\u201335 minutes",
          "Peak-hour traffic on the 37-Accra route can add 15\u201320 minutes"
        ]
      },
      {
        heading: "Hotels and addresses we serve daily",
        bullets: [
          "Kempinski Hotel Gold Coast City",
          "Number One Oxford Street Hotel & Suites",
          "La Villa Boutique Hotel",
          "Embassy and diplomatic residences in Cantonments",
          "Labone, Ring Road Central, and Dzorwulu extensions"
        ]
      },
      {
        heading: "Why book ahead for these districts",
        paragraphs: [
          "Osu and Cantonments are among the busiest areas in Accra after dark. A pre-booked chauffeur meets you inside the terminal, assists with luggage, and navigates directly to your address \u2014 no haggling, no wrong turns, and a fare confirmed before you land."
        ]
      }
    ]
  },
  {
    slug: "airport-taxi-vs-private-transfer-accra",
    title: "Airport Taxi vs Private Transfer in Accra: Which Is Better?",
    excerpt: "Compare official airport taxis, ride-hailing apps, and pre-booked chauffeur services from Kotoka International \u2014 cost, safety, and convenience.",
    category: "Airport Transfers",
    publishedAt: "2026-07-20",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Every traveller landing at Kotoka faces the same decision: grab a taxi at the rank, order a ride-hailing app, or walk to a pre-booked chauffeur waiting in arrivals. Each option has trade-offs \u2014 and for many visitors, the wrong choice turns a smooth arrival into an stressful one."
        ]
      },
      {
        heading: "Official airport taxis",
        bullets: [
          "Available at the terminal rank after customs",
          "Fares often negotiated on the spot \u2014 inconsistent pricing",
          "Vehicle condition and driver standards vary",
          "No flight tracking if your arrival is delayed",
          "Limited luggage capacity for groups"
        ]
      },
      {
        heading: "Ride-hailing apps",
        bullets: [
          "Convenient in central Accra during daytime",
          "Surge pricing possible at peak hours and late night",
          "Airport pickup coordination can be confusing after long flights",
          "Driver may not meet you inside the arrivals hall"
        ]
      },
      {
        heading: "Pre-booked private transfer",
        bullets: [
          "Fixed fare confirmed before you fly",
          "Flight monitoring and automatic schedule adjustment",
          "Meet-and-greet in arrivals with name board",
          "Professional chauffeur and insured vehicle class of your choice",
          "Direct door-to-door \u2014 no intermediate stops"
        ]
      },
      {
        heading: "Our recommendation",
        paragraphs: [
          "For first-time visitors, families, and business travellers, a pre-booked private transfer offers the best combination of safety, predictability, and comfort. Book online with AeroLink Ghana for an instant quote and Paystack-secure payment."
        ]
      }
    ]
  },
  {
    slug: "kotoka-terminal-3-meet-and-greet",
    title: "Kotoka Terminal 3 Meet-and-Greet: What to Expect",
    excerpt: "A step-by-step guide to arrivals at Terminal 3, Kotoka International \u2014 where to find your chauffeur and how meet-and-greet service works.",
    category: "Travel Tips",
    publishedAt: "2026-07-25",
    readTime: "4 min read",
    sections: [
      {
        paragraphs: [
          "Terminal 3 at Kotoka International Airport (ACC) handles most international arrivals to Ghana. If you have booked a private transfer with meet-and-greet, here is exactly what happens from the moment you land."
        ]
      },
      {
        heading: "Step-by-step arrivals process",
        bullets: [
          "Disembark and follow signs to immigration",
          "Complete immigration and collect baggage",
          "Exit through customs into the main arrivals hall",
          "Your chauffeur waits with a personalised name board",
          "Driver assists with luggage and escorts you to the vehicle"
        ]
      },
      {
        heading: "Before you travel",
        bullets: [
          "Share your flight number when booking \u2014 we track delays automatically",
          "Save your chauffeur's WhatsApp number from your confirmation email",
          "Confirm your full destination address including building or gate details",
          "Sixty minutes complimentary waiting is included from touchdown"
        ]
      },
      {
        heading: "Cannot find your driver?",
        paragraphs: [
          "Check your booking confirmation for the direct contact number. WhatsApp is the fastest way to reach our operations team. We also share your driver's photograph before pickup so you know exactly who to look for."
        ]
      }
    ]
  },
  {
    slug: "kotoka-airport-to-tema",
    title: "Kotoka Airport to Tema: Transfer Times & Booking Guide",
    excerpt: "How long does it take to get from Kotoka International to Tema? Routes, pricing factors, and tips for port city transfers.",
    category: "Destination Guides",
    publishedAt: "2026-08-01",
    readTime: "4 min read",
    sections: [
      {
        paragraphs: [
          "Tema \u2014 Ghana's principal port city \u2014 is a frequent destination for shipping professionals, industrial visitors, and residents commuting between the harbour area and Kotoka International Airport. The journey is longer than central Accra routes and benefits from advance planning."
        ]
      },
      {
        heading: "Distance and duration",
        bullets: [
          "Distance: approximately 35\u201340 km depending on your Tema address",
          "Light traffic: 45\u201360 minutes",
          "Peak hours: 75\u201390 minutes",
          "Early morning and late evening often fastest"
        ]
      },
      {
        heading: "Who books Tema transfers?",
        bullets: [
          "Shipping and logistics professionals",
          "Port and free-zone business visitors",
          "Residents of Tema Community and surrounding areas",
          "Connections to Spintex Road and Tema Motorway industrial zones"
        ]
      },
      {
        heading: "Book with a fixed fare",
        paragraphs: [
          "Longer routes make fixed pricing especially important \u2014 you do not want to negotiate after a long flight. Enter Tema as your destination on our booking page for an instant guaranteed quote."
        ]
      }
    ]
  },
  {
    slug: "corporate-airport-transfer-accra",
    title: "Corporate Airport Transfer Services in Accra",
    excerpt: "Dedicated chauffeured airport transfers for businesses, diplomatic missions, and visiting executives \u2014 account management, invoicing, and priority dispatch.",
    category: "Corporate",
    publishedAt: "2026-08-05",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Corporate travel demands reliability that consumer ride-hailing cannot guarantee. When a board member lands at Kotoka at midnight or a delegation of twelve arrives on the same flight, you need a transport partner with account management, consolidated billing, and priority dispatch."
        ]
      },
      {
        heading: "Corporate account benefits",
        bullets: [
          "Dedicated account manager and priority booking line",
          "Monthly consolidated invoicing",
          "Custom reporting for finance and travel teams",
          "Co-branded guest confirmation emails for hotel partners",
          "Multi-vehicle coordination for delegations and events"
        ]
      },
      {
        heading: "Industries we serve",
        bullets: [
          "Multinational corporations and regional headquarters",
          "Diplomatic missions and international organisations",
          "Luxury hotels and serviced residences",
          "Event planners and conference organisers",
          "NGOs and development agencies"
        ]
      },
      {
        heading: "Open a corporate account",
        paragraphs: [
          "Contact our corporate team via the enquiry form at aerolinkghana.com/corporate. We respond within one business hour with a tailored proposal."
        ]
      }
    ]
  },
  {
    slug: "accra-airport-transfer-prices-2026",
    title: "Accra Airport Transfer Prices in 2026: What to Expect",
    excerpt: "Transparent guide to Kotoka airport transfer pricing in Ghana \u2014 what affects your fare and how fixed pricing protects you from surge charges.",
    category: "Airport Transfers",
    publishedAt: "2026-08-08",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Airport transfer pricing in Accra varies widely depending on vehicle class, destination, time of day, and whether you book in advance. Understanding how fares are structured helps you avoid overpaying \u2014 and choose the service level that matches your journey."
        ]
      },
      {
        heading: "What affects your transfer price",
        bullets: [
          "Distance from Kotoka to your destination",
          "Vehicle class \u2014 executive sedan, premium SUV, or luxury van",
          "Number of passengers and luggage pieces",
          "Pickup type \u2014 airport arrival vs city-to-airport drop-off",
          "Additional stops or special requests"
        ]
      },
      {
        heading: "AeroLink fixed fare model",
        bullets: [
          "Instant online quote at aerolinkghana.com/book",
          "Price includes airport access, fuel, and gratuity",
          "No surge pricing at peak hours or during rain",
          "Same fare whether you pay via Paystack, WhatsApp, or cash",
          "Free cancellation up to 48 hours before pickup"
        ]
      },
      {
        heading: "Typical starting fares (2026)",
        bullets: [
          "Executive Sedan \u2014 central Accra districts from GHS 150",
          "Premium SUV \u2014 from GHS 220",
          "Luxury Van \u2014 groups from GHS 350",
          "Exact fare calculated instantly based on your route"
        ]
      },
      {
        heading: "Get your exact price now",
        paragraphs: [
          "Enter your pickup and destination on our booking page \u2014 your fixed fare appears in seconds. No account required."
        ]
      }
    ]
  },
  {
    slug: "kotoka-airport-hotel-transfers-marriott-kempinski",
    title: "Kotoka Airport to Marriott & Kempinski: Hotel Transfer Guide",
    excerpt: "Direct private transfers from Kotoka International to Accra Marriott, Kempinski Gold Coast City, Labadi Beach Hotel, and leading Airport City properties.",
    category: "Destination Guides",
    publishedAt: "2026-08-09",
    readTime: "4 min read",
    sections: [
      {
        paragraphs: [
          "Accra's leading international hotels cluster around Airport City, Ridge, and the Labadi coastline. If you are staying at the Marriott, Kempinski, or Labadi Beach Hotel, a pre-arranged chauffeur transfer is the standard choice for business and leisure travellers alike."
        ]
      },
      {
        heading: "Transfer times to major hotels",
        bullets: [
          "Kotoka \u2192 Accra Marriott Hotel: 10\u201320 minutes (Airport City)",
          "Kotoka \u2192 Kempinski Gold Coast City: 15\u201325 minutes",
          "Kotoka \u2192 Labadi Beach Hotel: 20\u201335 minutes",
          "Kotoka \u2192 M\xF6venpick Ambassador: 15\u201325 minutes",
          "Kotoka \u2192 Fiesta Royale / Tang Palace: 20\u201330 minutes"
        ]
      },
      {
        heading: "Hotel concierge coordination",
        paragraphs: [
          "Share your hotel confirmation with us when booking. We can coordinate with concierge teams for seamless guest arrivals and, for corporate partners, provide co-branded confirmation details."
        ]
      },
      {
        heading: "Book your hotel transfer",
        paragraphs: [
          "Select your hotel as the destination on our booking form or type the full address. Your chauffeur will deliver you directly to the hotel entrance \u2014 no parking hassles, no additional terminal waiting."
        ]
      }
    ]
  }
];
var BLOG_POSTS = withImages(RAW_BLOG_POSTS);

// prisma/seed.ts
var adapter = new PrismaPg2({ connectionString: process.env.DATABASE_URL });
var prisma2 = new PrismaClient({ adapter });
async function main() {
  console.log("Seeding database...");
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma2.user.upsert({
    where: { email: "admin@aerolinkghana.com" },
    update: {},
    create: {
      email: "admin@aerolinkghana.com",
      name: "Admin",
      passwordHash: adminPassword,
      role: "ADMIN",
      phone: "0555207204"
    }
  });
  console.log("Admin user:", admin.email);
  const vehicles = [
    {
      id: "executive-sedan",
      name: "Executive Sedan",
      description: "Mercedes E-Class or equivalent \u2014 the definitive choice for discerning business travellers and couples.",
      imageUrl: "/images/fleet-executive-sedan.png",
      capacity: 3,
      basePrice: 150,
      pricePerKm: 8,
      sortOrder: 1
    },
    {
      id: "premium-suv",
      name: "Premium SUV",
      description: "Range Rover or Toyota Land Cruiser \u2014 generous space, commanding presence, and uncompromising comfort.",
      imageUrl: "/images/fleet-premium-suv.png",
      capacity: 5,
      basePrice: 220,
      pricePerKm: 10,
      sortOrder: 2
    },
    {
      id: "luxury-van",
      name: "Luxury Van",
      description: "Mercedes Sprinter \u2014 the preferred vehicle for delegations, families, and corporate groups.",
      imageUrl: "/images/fleet-luxury-van.png",
      capacity: 10,
      basePrice: 350,
      pricePerKm: 12,
      sortOrder: 3
    }
  ];
  for (const vehicle of vehicles) {
    await prisma2.vehicle.upsert({
      where: { id: vehicle.id },
      update: {},
      create: vehicle
    });
  }
  console.log("Vehicles seeded");
  const cmsPages = [
    {
      slug: "about",
      title: "About AeroLink Ghana",
      excerpt: "Accra's premier chauffeured airport transfer service.",
      content: "<h2>Our mission</h2><p>AeroLink Ghana delivers world-class transportation from Kotoka International Airport to destinations across Greater Accra \u2014 with intelligent flight tracking, terminal meet-and-greet, fixed transparent pricing, and twenty-four-hour concierge support.</p><h2>Headquarters</h2><p>We are headquartered at Burma Camp, Accra, Ghana.</p>",
      metaTitle: "About AeroLink Ghana",
      metaDescription: "Learn about AeroLink Ghana \u2014 premium chauffeured airport transfers at Kotoka International Airport."
    },
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      excerpt: "How AeroLink Ghana collects, uses, and protects your personal data.",
      content: "<h2>Information we collect</h2><p>When you book a transfer, we collect your name, email, phone number, flight details, and journey information necessary to fulfil your reservation.</p><h2>How we use your data</h2><ul><li>To confirm and manage your booking</li><li>To communicate transfer updates</li><li>To process payments securely via Paystack</li><li>To improve our service quality</li></ul><h2>Data retention</h2><p>Booking records are retained for operational and legal purposes. You may request deletion of non-essential data by contacting us.</p>",
      metaTitle: "Privacy Policy | AeroLink Ghana",
      metaDescription: "Privacy policy for AeroLink Ghana airport transfer bookings."
    },
    {
      slug: "terms-of-service",
      title: "Terms of Service",
      excerpt: "Terms and conditions for AeroLink Ghana transfer bookings.",
      content: "<h2>Bookings</h2><p>All reservations are subject to vehicle availability and confirmed pickup details. Fares quoted at booking are fixed unless the journey details change materially.</p><h2>Cancellations</h2><p>Cancellations made at least 24 hours before pickup may qualify for a full refund. Late cancellations may incur a fee.</p><h2>Passenger conduct</h2><p>We reserve the right to refuse service where passenger conduct poses a safety risk to chauffeurs or vehicles.</p>",
      metaTitle: "Terms of Service | AeroLink Ghana",
      metaDescription: "Terms and conditions for booking airport transfers with AeroLink Ghana."
    }
  ];
  for (const page of cmsPages) {
    await prisma2.cmsPage.upsert({
      where: { slug: page.slug },
      update: {},
      create: { ...page, isPublished: true }
    });
  }
  console.log("CMS pages seeded");
  for (const post of RAW_BLOG_POSTS) {
    const { image, imageAlt } = getBlogImageMeta(post.slug, post.title);
    await prisma2.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        publishedAt: new Date(post.publishedAt),
        readTime: post.readTime,
        imageUrl: image,
        imageAlt,
        sections: post.sections,
        isPublished: true
      }
    });
  }
  console.log("Blog posts seeded");
  for (const [key, value] of Object.entries({
    site_name: "AeroLink Ghana",
    site_tagline: "World-Class Airport Transfers",
    contact_phone: "0555207204",
    contact_whatsapp: "233555207204",
    contact_email: "bookings@aerolinkghana.com",
    contact_address: "Burma Camp, Accra, Ghana",
    seo_default_description: "Premium chauffeured airport transfers at Kotoka International Airport, Accra. Fixed fares, flight tracking, and 24/7 concierge.",
    seo_og_image: "/images/og-preview.png",
    maintenance_mode: "false"
  })) {
    await prisma2.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value }
    });
  }
  console.log("Site settings seeded");
  console.log("Seed complete!");
}
main().catch(console.error).finally(() => prisma2.$disconnect());
