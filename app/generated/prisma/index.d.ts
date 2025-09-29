
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Match
 * 
 */
export type Match = $Result.DefaultSelection<Prisma.$MatchPayload>
/**
 * Model Commentary
 * 
 */
export type Commentary = $Result.DefaultSelection<Prisma.$CommentaryPayload>
/**
 * Model MatchEvent
 * 
 */
export type MatchEvent = $Result.DefaultSelection<Prisma.$MatchEventPayload>
/**
 * Model CommentaryEvent
 * 
 */
export type CommentaryEvent = $Result.DefaultSelection<Prisma.$CommentaryEventPayload>
/**
 * Model SyncReport
 * 
 */
export type SyncReport = $Result.DefaultSelection<Prisma.$SyncReportPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.match`: Exposes CRUD operations for the **Match** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Matches
    * const matches = await prisma.match.findMany()
    * ```
    */
  get match(): Prisma.MatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.commentary`: Exposes CRUD operations for the **Commentary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Commentaries
    * const commentaries = await prisma.commentary.findMany()
    * ```
    */
  get commentary(): Prisma.CommentaryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matchEvent`: Exposes CRUD operations for the **MatchEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MatchEvents
    * const matchEvents = await prisma.matchEvent.findMany()
    * ```
    */
  get matchEvent(): Prisma.MatchEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.commentaryEvent`: Exposes CRUD operations for the **CommentaryEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CommentaryEvents
    * const commentaryEvents = await prisma.commentaryEvent.findMany()
    * ```
    */
  get commentaryEvent(): Prisma.CommentaryEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.syncReport`: Exposes CRUD operations for the **SyncReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncReports
    * const syncReports = await prisma.syncReport.findMany()
    * ```
    */
  get syncReport(): Prisma.SyncReportDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Match: 'Match',
    Commentary: 'Commentary',
    MatchEvent: 'MatchEvent',
    CommentaryEvent: 'CommentaryEvent',
    SyncReport: 'SyncReport'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "match" | "commentary" | "matchEvent" | "commentaryEvent" | "syncReport"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Match: {
        payload: Prisma.$MatchPayload<ExtArgs>
        fields: Prisma.MatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findFirst: {
            args: Prisma.MatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findMany: {
            args: Prisma.MatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          create: {
            args: Prisma.MatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          createMany: {
            args: Prisma.MatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          delete: {
            args: Prisma.MatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          update: {
            args: Prisma.MatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          deleteMany: {
            args: Prisma.MatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          upsert: {
            args: Prisma.MatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          aggregate: {
            args: Prisma.MatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatch>
          }
          groupBy: {
            args: Prisma.MatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchCountArgs<ExtArgs>
            result: $Utils.Optional<MatchCountAggregateOutputType> | number
          }
        }
      }
      Commentary: {
        payload: Prisma.$CommentaryPayload<ExtArgs>
        fields: Prisma.CommentaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>
          }
          findFirst: {
            args: Prisma.CommentaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>
          }
          findMany: {
            args: Prisma.CommentaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>[]
          }
          create: {
            args: Prisma.CommentaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>
          }
          createMany: {
            args: Prisma.CommentaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>[]
          }
          delete: {
            args: Prisma.CommentaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>
          }
          update: {
            args: Prisma.CommentaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>
          }
          deleteMany: {
            args: Prisma.CommentaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentaryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>[]
          }
          upsert: {
            args: Prisma.CommentaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryPayload>
          }
          aggregate: {
            args: Prisma.CommentaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommentary>
          }
          groupBy: {
            args: Prisma.CommentaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentaryCountArgs<ExtArgs>
            result: $Utils.Optional<CommentaryCountAggregateOutputType> | number
          }
        }
      }
      MatchEvent: {
        payload: Prisma.$MatchEventPayload<ExtArgs>
        fields: Prisma.MatchEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEventPayload>
          }
          findFirst: {
            args: Prisma.MatchEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEventPayload>
          }
          findMany: {
            args: Prisma.MatchEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEventPayload>[]
          }
          create: {
            args: Prisma.MatchEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEventPayload>
          }
          createMany: {
            args: Prisma.MatchEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEventPayload>[]
          }
          delete: {
            args: Prisma.MatchEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEventPayload>
          }
          update: {
            args: Prisma.MatchEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEventPayload>
          }
          deleteMany: {
            args: Prisma.MatchEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEventPayload>[]
          }
          upsert: {
            args: Prisma.MatchEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEventPayload>
          }
          aggregate: {
            args: Prisma.MatchEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatchEvent>
          }
          groupBy: {
            args: Prisma.MatchEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchEventCountArgs<ExtArgs>
            result: $Utils.Optional<MatchEventCountAggregateOutputType> | number
          }
        }
      }
      CommentaryEvent: {
        payload: Prisma.$CommentaryEventPayload<ExtArgs>
        fields: Prisma.CommentaryEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentaryEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentaryEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryEventPayload>
          }
          findFirst: {
            args: Prisma.CommentaryEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentaryEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryEventPayload>
          }
          findMany: {
            args: Prisma.CommentaryEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryEventPayload>[]
          }
          create: {
            args: Prisma.CommentaryEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryEventPayload>
          }
          createMany: {
            args: Prisma.CommentaryEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentaryEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryEventPayload>[]
          }
          delete: {
            args: Prisma.CommentaryEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryEventPayload>
          }
          update: {
            args: Prisma.CommentaryEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryEventPayload>
          }
          deleteMany: {
            args: Prisma.CommentaryEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentaryEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentaryEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryEventPayload>[]
          }
          upsert: {
            args: Prisma.CommentaryEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentaryEventPayload>
          }
          aggregate: {
            args: Prisma.CommentaryEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommentaryEvent>
          }
          groupBy: {
            args: Prisma.CommentaryEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentaryEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentaryEventCountArgs<ExtArgs>
            result: $Utils.Optional<CommentaryEventCountAggregateOutputType> | number
          }
        }
      }
      SyncReport: {
        payload: Prisma.$SyncReportPayload<ExtArgs>
        fields: Prisma.SyncReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncReportPayload>
          }
          findFirst: {
            args: Prisma.SyncReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncReportPayload>
          }
          findMany: {
            args: Prisma.SyncReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncReportPayload>[]
          }
          create: {
            args: Prisma.SyncReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncReportPayload>
          }
          createMany: {
            args: Prisma.SyncReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncReportPayload>[]
          }
          delete: {
            args: Prisma.SyncReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncReportPayload>
          }
          update: {
            args: Prisma.SyncReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncReportPayload>
          }
          deleteMany: {
            args: Prisma.SyncReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SyncReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncReportPayload>[]
          }
          upsert: {
            args: Prisma.SyncReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncReportPayload>
          }
          aggregate: {
            args: Prisma.SyncReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncReport>
          }
          groupBy: {
            args: Prisma.SyncReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncReportCountArgs<ExtArgs>
            result: $Utils.Optional<SyncReportCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    match?: MatchOmit
    commentary?: CommentaryOmit
    matchEvent?: MatchEventOmit
    commentaryEvent?: CommentaryEventOmit
    syncReport?: SyncReportOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    commentaries: number
    syncReports: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commentaries?: boolean | UserCountOutputTypeCountCommentariesArgs
    syncReports?: boolean | UserCountOutputTypeCountSyncReportsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentaryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSyncReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncReportWhereInput
  }


  /**
   * Count Type MatchCountOutputType
   */

  export type MatchCountOutputType = {
    commentaries: number
    events: number
  }

  export type MatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commentaries?: boolean | MatchCountOutputTypeCountCommentariesArgs
    events?: boolean | MatchCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchCountOutputType
     */
    select?: MatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeCountCommentariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentaryWhereInput
  }

  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchEventWhereInput
  }


  /**
   * Count Type CommentaryCountOutputType
   */

  export type CommentaryCountOutputType = {
    events: number
    syncReports: number
  }

  export type CommentaryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | CommentaryCountOutputTypeCountEventsArgs
    syncReports?: boolean | CommentaryCountOutputTypeCountSyncReportsArgs
  }

  // Custom InputTypes
  /**
   * CommentaryCountOutputType without action
   */
  export type CommentaryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentaryCountOutputType
     */
    select?: CommentaryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CommentaryCountOutputType without action
   */
  export type CommentaryCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentaryEventWhereInput
  }

  /**
   * CommentaryCountOutputType without action
   */
  export type CommentaryCountOutputTypeCountSyncReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncReportWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    isCommentator: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    isCommentator: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    isCommentator: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    isCommentator?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    isCommentator?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    isCommentator?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    password: string
    isCommentator: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    isCommentator?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    commentaries?: boolean | User$commentariesArgs<ExtArgs>
    syncReports?: boolean | User$syncReportsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    isCommentator?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    isCommentator?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    isCommentator?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "isCommentator" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commentaries?: boolean | User$commentariesArgs<ExtArgs>
    syncReports?: boolean | User$syncReportsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      commentaries: Prisma.$CommentaryPayload<ExtArgs>[]
      syncReports: Prisma.$SyncReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      isCommentator: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    commentaries<T extends User$commentariesArgs<ExtArgs> = {}>(args?: Subset<T, User$commentariesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    syncReports<T extends User$syncReportsArgs<ExtArgs> = {}>(args?: Subset<T, User$syncReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly isCommentator: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.commentaries
   */
  export type User$commentariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    where?: CommentaryWhereInput
    orderBy?: CommentaryOrderByWithRelationInput | CommentaryOrderByWithRelationInput[]
    cursor?: CommentaryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentaryScalarFieldEnum | CommentaryScalarFieldEnum[]
  }

  /**
   * User.syncReports
   */
  export type User$syncReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncReport
     */
    select?: SyncReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncReport
     */
    omit?: SyncReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncReportInclude<ExtArgs> | null
    where?: SyncReportWhereInput
    orderBy?: SyncReportOrderByWithRelationInput | SyncReportOrderByWithRelationInput[]
    cursor?: SyncReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SyncReportScalarFieldEnum | SyncReportScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Match
   */

  export type AggregateMatch = {
    _count: MatchCountAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  export type MatchMinAggregateOutputType = {
    id: string | null
    league: string | null
    homeTeam: string | null
    awayTeam: string | null
    scheduledTime: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MatchMaxAggregateOutputType = {
    id: string | null
    league: string | null
    homeTeam: string | null
    awayTeam: string | null
    scheduledTime: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MatchCountAggregateOutputType = {
    id: number
    league: number
    homeTeam: number
    awayTeam: number
    scheduledTime: number
    streamUrlPatterns: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MatchMinAggregateInputType = {
    id?: true
    league?: true
    homeTeam?: true
    awayTeam?: true
    scheduledTime?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MatchMaxAggregateInputType = {
    id?: true
    league?: true
    homeTeam?: true
    awayTeam?: true
    scheduledTime?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MatchCountAggregateInputType = {
    id?: true
    league?: true
    homeTeam?: true
    awayTeam?: true
    scheduledTime?: true
    streamUrlPatterns?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Match to aggregate.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Matches
    **/
    _count?: true | MatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchMaxAggregateInputType
  }

  export type GetMatchAggregateType<T extends MatchAggregateArgs> = {
        [P in keyof T & keyof AggregateMatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatch[P]>
      : GetScalarType<T[P], AggregateMatch[P]>
  }




  export type MatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithAggregationInput | MatchOrderByWithAggregationInput[]
    by: MatchScalarFieldEnum[] | MatchScalarFieldEnum
    having?: MatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchCountAggregateInputType | true
    _min?: MatchMinAggregateInputType
    _max?: MatchMaxAggregateInputType
  }

  export type MatchGroupByOutputType = {
    id: string
    league: string
    homeTeam: string
    awayTeam: string
    scheduledTime: Date
    streamUrlPatterns: string[]
    status: string
    createdAt: Date
    updatedAt: Date
    _count: MatchCountAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  type GetMatchGroupByPayload<T extends MatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchGroupByOutputType[P]>
            : GetScalarType<T[P], MatchGroupByOutputType[P]>
        }
      >
    >


  export type MatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    league?: boolean
    homeTeam?: boolean
    awayTeam?: boolean
    scheduledTime?: boolean
    streamUrlPatterns?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    commentaries?: boolean | Match$commentariesArgs<ExtArgs>
    events?: boolean | Match$eventsArgs<ExtArgs>
    _count?: boolean | MatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    league?: boolean
    homeTeam?: boolean
    awayTeam?: boolean
    scheduledTime?: boolean
    streamUrlPatterns?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["match"]>

  export type MatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    league?: boolean
    homeTeam?: boolean
    awayTeam?: boolean
    scheduledTime?: boolean
    streamUrlPatterns?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["match"]>

  export type MatchSelectScalar = {
    id?: boolean
    league?: boolean
    homeTeam?: boolean
    awayTeam?: boolean
    scheduledTime?: boolean
    streamUrlPatterns?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "league" | "homeTeam" | "awayTeam" | "scheduledTime" | "streamUrlPatterns" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["match"]>
  export type MatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commentaries?: boolean | Match$commentariesArgs<ExtArgs>
    events?: boolean | Match$eventsArgs<ExtArgs>
    _count?: boolean | MatchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Match"
    objects: {
      commentaries: Prisma.$CommentaryPayload<ExtArgs>[]
      events: Prisma.$MatchEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      league: string
      homeTeam: string
      awayTeam: string
      scheduledTime: Date
      streamUrlPatterns: string[]
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["match"]>
    composites: {}
  }

  type MatchGetPayload<S extends boolean | null | undefined | MatchDefaultArgs> = $Result.GetResult<Prisma.$MatchPayload, S>

  type MatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchCountAggregateInputType | true
    }

  export interface MatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Match'], meta: { name: 'Match' } }
    /**
     * Find zero or one Match that matches the filter.
     * @param {MatchFindUniqueArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchFindUniqueArgs>(args: SelectSubset<T, MatchFindUniqueArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Match that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchFindUniqueOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchFindFirstArgs>(args?: SelectSubset<T, MatchFindFirstArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Matches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Matches
     * const matches = await prisma.match.findMany()
     * 
     * // Get first 10 Matches
     * const matches = await prisma.match.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchWithIdOnly = await prisma.match.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchFindManyArgs>(args?: SelectSubset<T, MatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Match.
     * @param {MatchCreateArgs} args - Arguments to create a Match.
     * @example
     * // Create one Match
     * const Match = await prisma.match.create({
     *   data: {
     *     // ... data to create a Match
     *   }
     * })
     * 
     */
    create<T extends MatchCreateArgs>(args: SelectSubset<T, MatchCreateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Matches.
     * @param {MatchCreateManyArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchCreateManyArgs>(args?: SelectSubset<T, MatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Matches and returns the data saved in the database.
     * @param {MatchCreateManyAndReturnArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Match.
     * @param {MatchDeleteArgs} args - Arguments to delete one Match.
     * @example
     * // Delete one Match
     * const Match = await prisma.match.delete({
     *   where: {
     *     // ... filter to delete one Match
     *   }
     * })
     * 
     */
    delete<T extends MatchDeleteArgs>(args: SelectSubset<T, MatchDeleteArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Match.
     * @param {MatchUpdateArgs} args - Arguments to update one Match.
     * @example
     * // Update one Match
     * const match = await prisma.match.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchUpdateArgs>(args: SelectSubset<T, MatchUpdateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Matches.
     * @param {MatchDeleteManyArgs} args - Arguments to filter Matches to delete.
     * @example
     * // Delete a few Matches
     * const { count } = await prisma.match.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchDeleteManyArgs>(args?: SelectSubset<T, MatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchUpdateManyArgs>(args: SelectSubset<T, MatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches and returns the data updated in the database.
     * @param {MatchUpdateManyAndReturnArgs} args - Arguments to update many Matches.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Match.
     * @param {MatchUpsertArgs} args - Arguments to update or create a Match.
     * @example
     * // Update or create a Match
     * const match = await prisma.match.upsert({
     *   create: {
     *     // ... data to create a Match
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Match we want to update
     *   }
     * })
     */
    upsert<T extends MatchUpsertArgs>(args: SelectSubset<T, MatchUpsertArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchCountArgs} args - Arguments to filter Matches to count.
     * @example
     * // Count the number of Matches
     * const count = await prisma.match.count({
     *   where: {
     *     // ... the filter for the Matches we want to count
     *   }
     * })
    **/
    count<T extends MatchCountArgs>(
      args?: Subset<T, MatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchAggregateArgs>(args: Subset<T, MatchAggregateArgs>): Prisma.PrismaPromise<GetMatchAggregateType<T>>

    /**
     * Group by Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchGroupByArgs['orderBy'] }
        : { orderBy?: MatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Match model
   */
  readonly fields: MatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Match.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    commentaries<T extends Match$commentariesArgs<ExtArgs> = {}>(args?: Subset<T, Match$commentariesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends Match$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Match$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Match model
   */
  interface MatchFieldRefs {
    readonly id: FieldRef<"Match", 'String'>
    readonly league: FieldRef<"Match", 'String'>
    readonly homeTeam: FieldRef<"Match", 'String'>
    readonly awayTeam: FieldRef<"Match", 'String'>
    readonly scheduledTime: FieldRef<"Match", 'DateTime'>
    readonly streamUrlPatterns: FieldRef<"Match", 'String[]'>
    readonly status: FieldRef<"Match", 'String'>
    readonly createdAt: FieldRef<"Match", 'DateTime'>
    readonly updatedAt: FieldRef<"Match", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Match findUnique
   */
  export type MatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findUniqueOrThrow
   */
  export type MatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findFirst
   */
  export type MatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findFirstOrThrow
   */
  export type MatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findMany
   */
  export type MatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Matches to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match create
   */
  export type MatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to create a Match.
     */
    data: XOR<MatchCreateInput, MatchUncheckedCreateInput>
  }

  /**
   * Match createMany
   */
  export type MatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Match createManyAndReturn
   */
  export type MatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Match update
   */
  export type MatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to update a Match.
     */
    data: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
    /**
     * Choose, which Match to update.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match updateMany
   */
  export type MatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
  }

  /**
   * Match updateManyAndReturn
   */
  export type MatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
  }

  /**
   * Match upsert
   */
  export type MatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The filter to search for the Match to update in case it exists.
     */
    where: MatchWhereUniqueInput
    /**
     * In case the Match found by the `where` argument doesn't exist, create a new Match with this data.
     */
    create: XOR<MatchCreateInput, MatchUncheckedCreateInput>
    /**
     * In case the Match was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
  }

  /**
   * Match delete
   */
  export type MatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter which Match to delete.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match deleteMany
   */
  export type MatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Matches to delete
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to delete.
     */
    limit?: number
  }

  /**
   * Match.commentaries
   */
  export type Match$commentariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    where?: CommentaryWhereInput
    orderBy?: CommentaryOrderByWithRelationInput | CommentaryOrderByWithRelationInput[]
    cursor?: CommentaryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentaryScalarFieldEnum | CommentaryScalarFieldEnum[]
  }

  /**
   * Match.events
   */
  export type Match$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvent
     */
    select?: MatchEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvent
     */
    omit?: MatchEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEventInclude<ExtArgs> | null
    where?: MatchEventWhereInput
    orderBy?: MatchEventOrderByWithRelationInput | MatchEventOrderByWithRelationInput[]
    cursor?: MatchEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchEventScalarFieldEnum | MatchEventScalarFieldEnum[]
  }

  /**
   * Match without action
   */
  export type MatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
  }


  /**
   * Model Commentary
   */

  export type AggregateCommentary = {
    _count: CommentaryCountAggregateOutputType | null
    _avg: CommentaryAvgAggregateOutputType | null
    _sum: CommentarySumAggregateOutputType | null
    _min: CommentaryMinAggregateOutputType | null
    _max: CommentaryMaxAggregateOutputType | null
  }

  export type CommentaryAvgAggregateOutputType = {
    duration: number | null
    baselineOffset: number | null
    avgLatency: number | null
    viewCount: number | null
    rating: number | null
  }

  export type CommentarySumAggregateOutputType = {
    duration: number | null
    baselineOffset: number | null
    avgLatency: number | null
    viewCount: number | null
    rating: number | null
  }

  export type CommentaryMinAggregateOutputType = {
    id: string | null
    matchId: string | null
    commentatorId: string | null
    title: string | null
    description: string | null
    audioUrl: string | null
    duration: number | null
    youtubeStreamUrl: string | null
    youtubeStreamId: string | null
    status: string | null
    language: string | null
    baselineOffset: number | null
    avgLatency: number | null
    viewCount: number | null
    rating: number | null
    startedAt: Date | null
    endedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommentaryMaxAggregateOutputType = {
    id: string | null
    matchId: string | null
    commentatorId: string | null
    title: string | null
    description: string | null
    audioUrl: string | null
    duration: number | null
    youtubeStreamUrl: string | null
    youtubeStreamId: string | null
    status: string | null
    language: string | null
    baselineOffset: number | null
    avgLatency: number | null
    viewCount: number | null
    rating: number | null
    startedAt: Date | null
    endedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommentaryCountAggregateOutputType = {
    id: number
    matchId: number
    commentatorId: number
    title: number
    description: number
    audioUrl: number
    duration: number
    youtubeStreamUrl: number
    youtubeStreamId: number
    status: number
    language: number
    baselineOffset: number
    avgLatency: number
    viewCount: number
    rating: number
    startedAt: number
    endedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CommentaryAvgAggregateInputType = {
    duration?: true
    baselineOffset?: true
    avgLatency?: true
    viewCount?: true
    rating?: true
  }

  export type CommentarySumAggregateInputType = {
    duration?: true
    baselineOffset?: true
    avgLatency?: true
    viewCount?: true
    rating?: true
  }

  export type CommentaryMinAggregateInputType = {
    id?: true
    matchId?: true
    commentatorId?: true
    title?: true
    description?: true
    audioUrl?: true
    duration?: true
    youtubeStreamUrl?: true
    youtubeStreamId?: true
    status?: true
    language?: true
    baselineOffset?: true
    avgLatency?: true
    viewCount?: true
    rating?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommentaryMaxAggregateInputType = {
    id?: true
    matchId?: true
    commentatorId?: true
    title?: true
    description?: true
    audioUrl?: true
    duration?: true
    youtubeStreamUrl?: true
    youtubeStreamId?: true
    status?: true
    language?: true
    baselineOffset?: true
    avgLatency?: true
    viewCount?: true
    rating?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommentaryCountAggregateInputType = {
    id?: true
    matchId?: true
    commentatorId?: true
    title?: true
    description?: true
    audioUrl?: true
    duration?: true
    youtubeStreamUrl?: true
    youtubeStreamId?: true
    status?: true
    language?: true
    baselineOffset?: true
    avgLatency?: true
    viewCount?: true
    rating?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CommentaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commentary to aggregate.
     */
    where?: CommentaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commentaries to fetch.
     */
    orderBy?: CommentaryOrderByWithRelationInput | CommentaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commentaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commentaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Commentaries
    **/
    _count?: true | CommentaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentaryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentarySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentaryMaxAggregateInputType
  }

  export type GetCommentaryAggregateType<T extends CommentaryAggregateArgs> = {
        [P in keyof T & keyof AggregateCommentary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommentary[P]>
      : GetScalarType<T[P], AggregateCommentary[P]>
  }




  export type CommentaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentaryWhereInput
    orderBy?: CommentaryOrderByWithAggregationInput | CommentaryOrderByWithAggregationInput[]
    by: CommentaryScalarFieldEnum[] | CommentaryScalarFieldEnum
    having?: CommentaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentaryCountAggregateInputType | true
    _avg?: CommentaryAvgAggregateInputType
    _sum?: CommentarySumAggregateInputType
    _min?: CommentaryMinAggregateInputType
    _max?: CommentaryMaxAggregateInputType
  }

  export type CommentaryGroupByOutputType = {
    id: string
    matchId: string
    commentatorId: string
    title: string
    description: string | null
    audioUrl: string | null
    duration: number
    youtubeStreamUrl: string | null
    youtubeStreamId: string | null
    status: string
    language: string
    baselineOffset: number
    avgLatency: number
    viewCount: number
    rating: number
    startedAt: Date | null
    endedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: CommentaryCountAggregateOutputType | null
    _avg: CommentaryAvgAggregateOutputType | null
    _sum: CommentarySumAggregateOutputType | null
    _min: CommentaryMinAggregateOutputType | null
    _max: CommentaryMaxAggregateOutputType | null
  }

  type GetCommentaryGroupByPayload<T extends CommentaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentaryGroupByOutputType[P]>
            : GetScalarType<T[P], CommentaryGroupByOutputType[P]>
        }
      >
    >


  export type CommentarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    commentatorId?: boolean
    title?: boolean
    description?: boolean
    audioUrl?: boolean
    duration?: boolean
    youtubeStreamUrl?: boolean
    youtubeStreamId?: boolean
    status?: boolean
    language?: boolean
    baselineOffset?: boolean
    avgLatency?: boolean
    viewCount?: boolean
    rating?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
    commentator?: boolean | UserDefaultArgs<ExtArgs>
    events?: boolean | Commentary$eventsArgs<ExtArgs>
    syncReports?: boolean | Commentary$syncReportsArgs<ExtArgs>
    _count?: boolean | CommentaryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentary"]>

  export type CommentarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    commentatorId?: boolean
    title?: boolean
    description?: boolean
    audioUrl?: boolean
    duration?: boolean
    youtubeStreamUrl?: boolean
    youtubeStreamId?: boolean
    status?: boolean
    language?: boolean
    baselineOffset?: boolean
    avgLatency?: boolean
    viewCount?: boolean
    rating?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
    commentator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentary"]>

  export type CommentarySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    commentatorId?: boolean
    title?: boolean
    description?: boolean
    audioUrl?: boolean
    duration?: boolean
    youtubeStreamUrl?: boolean
    youtubeStreamId?: boolean
    status?: boolean
    language?: boolean
    baselineOffset?: boolean
    avgLatency?: boolean
    viewCount?: boolean
    rating?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
    commentator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentary"]>

  export type CommentarySelectScalar = {
    id?: boolean
    matchId?: boolean
    commentatorId?: boolean
    title?: boolean
    description?: boolean
    audioUrl?: boolean
    duration?: boolean
    youtubeStreamUrl?: boolean
    youtubeStreamId?: boolean
    status?: boolean
    language?: boolean
    baselineOffset?: boolean
    avgLatency?: boolean
    viewCount?: boolean
    rating?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CommentaryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "matchId" | "commentatorId" | "title" | "description" | "audioUrl" | "duration" | "youtubeStreamUrl" | "youtubeStreamId" | "status" | "language" | "baselineOffset" | "avgLatency" | "viewCount" | "rating" | "startedAt" | "endedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["commentary"]>
  export type CommentaryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
    commentator?: boolean | UserDefaultArgs<ExtArgs>
    events?: boolean | Commentary$eventsArgs<ExtArgs>
    syncReports?: boolean | Commentary$syncReportsArgs<ExtArgs>
    _count?: boolean | CommentaryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CommentaryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
    commentator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommentaryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
    commentator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CommentaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Commentary"
    objects: {
      match: Prisma.$MatchPayload<ExtArgs>
      commentator: Prisma.$UserPayload<ExtArgs>
      events: Prisma.$CommentaryEventPayload<ExtArgs>[]
      syncReports: Prisma.$SyncReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      matchId: string
      commentatorId: string
      title: string
      description: string | null
      audioUrl: string | null
      duration: number
      youtubeStreamUrl: string | null
      youtubeStreamId: string | null
      status: string
      language: string
      baselineOffset: number
      avgLatency: number
      viewCount: number
      rating: number
      startedAt: Date | null
      endedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["commentary"]>
    composites: {}
  }

  type CommentaryGetPayload<S extends boolean | null | undefined | CommentaryDefaultArgs> = $Result.GetResult<Prisma.$CommentaryPayload, S>

  type CommentaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentaryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentaryCountAggregateInputType | true
    }

  export interface CommentaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Commentary'], meta: { name: 'Commentary' } }
    /**
     * Find zero or one Commentary that matches the filter.
     * @param {CommentaryFindUniqueArgs} args - Arguments to find a Commentary
     * @example
     * // Get one Commentary
     * const commentary = await prisma.commentary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentaryFindUniqueArgs>(args: SelectSubset<T, CommentaryFindUniqueArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Commentary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentaryFindUniqueOrThrowArgs} args - Arguments to find a Commentary
     * @example
     * // Get one Commentary
     * const commentary = await prisma.commentary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentaryFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Commentary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryFindFirstArgs} args - Arguments to find a Commentary
     * @example
     * // Get one Commentary
     * const commentary = await prisma.commentary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentaryFindFirstArgs>(args?: SelectSubset<T, CommentaryFindFirstArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Commentary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryFindFirstOrThrowArgs} args - Arguments to find a Commentary
     * @example
     * // Get one Commentary
     * const commentary = await prisma.commentary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentaryFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Commentaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Commentaries
     * const commentaries = await prisma.commentary.findMany()
     * 
     * // Get first 10 Commentaries
     * const commentaries = await prisma.commentary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentaryWithIdOnly = await prisma.commentary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentaryFindManyArgs>(args?: SelectSubset<T, CommentaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Commentary.
     * @param {CommentaryCreateArgs} args - Arguments to create a Commentary.
     * @example
     * // Create one Commentary
     * const Commentary = await prisma.commentary.create({
     *   data: {
     *     // ... data to create a Commentary
     *   }
     * })
     * 
     */
    create<T extends CommentaryCreateArgs>(args: SelectSubset<T, CommentaryCreateArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Commentaries.
     * @param {CommentaryCreateManyArgs} args - Arguments to create many Commentaries.
     * @example
     * // Create many Commentaries
     * const commentary = await prisma.commentary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentaryCreateManyArgs>(args?: SelectSubset<T, CommentaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Commentaries and returns the data saved in the database.
     * @param {CommentaryCreateManyAndReturnArgs} args - Arguments to create many Commentaries.
     * @example
     * // Create many Commentaries
     * const commentary = await prisma.commentary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Commentaries and only return the `id`
     * const commentaryWithIdOnly = await prisma.commentary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentaryCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Commentary.
     * @param {CommentaryDeleteArgs} args - Arguments to delete one Commentary.
     * @example
     * // Delete one Commentary
     * const Commentary = await prisma.commentary.delete({
     *   where: {
     *     // ... filter to delete one Commentary
     *   }
     * })
     * 
     */
    delete<T extends CommentaryDeleteArgs>(args: SelectSubset<T, CommentaryDeleteArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Commentary.
     * @param {CommentaryUpdateArgs} args - Arguments to update one Commentary.
     * @example
     * // Update one Commentary
     * const commentary = await prisma.commentary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentaryUpdateArgs>(args: SelectSubset<T, CommentaryUpdateArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Commentaries.
     * @param {CommentaryDeleteManyArgs} args - Arguments to filter Commentaries to delete.
     * @example
     * // Delete a few Commentaries
     * const { count } = await prisma.commentary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentaryDeleteManyArgs>(args?: SelectSubset<T, CommentaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commentaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Commentaries
     * const commentary = await prisma.commentary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentaryUpdateManyArgs>(args: SelectSubset<T, CommentaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commentaries and returns the data updated in the database.
     * @param {CommentaryUpdateManyAndReturnArgs} args - Arguments to update many Commentaries.
     * @example
     * // Update many Commentaries
     * const commentary = await prisma.commentary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Commentaries and only return the `id`
     * const commentaryWithIdOnly = await prisma.commentary.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentaryUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentaryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Commentary.
     * @param {CommentaryUpsertArgs} args - Arguments to update or create a Commentary.
     * @example
     * // Update or create a Commentary
     * const commentary = await prisma.commentary.upsert({
     *   create: {
     *     // ... data to create a Commentary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Commentary we want to update
     *   }
     * })
     */
    upsert<T extends CommentaryUpsertArgs>(args: SelectSubset<T, CommentaryUpsertArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Commentaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryCountArgs} args - Arguments to filter Commentaries to count.
     * @example
     * // Count the number of Commentaries
     * const count = await prisma.commentary.count({
     *   where: {
     *     // ... the filter for the Commentaries we want to count
     *   }
     * })
    **/
    count<T extends CommentaryCountArgs>(
      args?: Subset<T, CommentaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Commentary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentaryAggregateArgs>(args: Subset<T, CommentaryAggregateArgs>): Prisma.PrismaPromise<GetCommentaryAggregateType<T>>

    /**
     * Group by Commentary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentaryGroupByArgs['orderBy'] }
        : { orderBy?: CommentaryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Commentary model
   */
  readonly fields: CommentaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Commentary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    match<T extends MatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MatchDefaultArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    commentator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    events<T extends Commentary$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Commentary$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentaryEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    syncReports<T extends Commentary$syncReportsArgs<ExtArgs> = {}>(args?: Subset<T, Commentary$syncReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Commentary model
   */
  interface CommentaryFieldRefs {
    readonly id: FieldRef<"Commentary", 'String'>
    readonly matchId: FieldRef<"Commentary", 'String'>
    readonly commentatorId: FieldRef<"Commentary", 'String'>
    readonly title: FieldRef<"Commentary", 'String'>
    readonly description: FieldRef<"Commentary", 'String'>
    readonly audioUrl: FieldRef<"Commentary", 'String'>
    readonly duration: FieldRef<"Commentary", 'Int'>
    readonly youtubeStreamUrl: FieldRef<"Commentary", 'String'>
    readonly youtubeStreamId: FieldRef<"Commentary", 'String'>
    readonly status: FieldRef<"Commentary", 'String'>
    readonly language: FieldRef<"Commentary", 'String'>
    readonly baselineOffset: FieldRef<"Commentary", 'Int'>
    readonly avgLatency: FieldRef<"Commentary", 'Int'>
    readonly viewCount: FieldRef<"Commentary", 'Int'>
    readonly rating: FieldRef<"Commentary", 'Float'>
    readonly startedAt: FieldRef<"Commentary", 'DateTime'>
    readonly endedAt: FieldRef<"Commentary", 'DateTime'>
    readonly createdAt: FieldRef<"Commentary", 'DateTime'>
    readonly updatedAt: FieldRef<"Commentary", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Commentary findUnique
   */
  export type CommentaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * Filter, which Commentary to fetch.
     */
    where: CommentaryWhereUniqueInput
  }

  /**
   * Commentary findUniqueOrThrow
   */
  export type CommentaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * Filter, which Commentary to fetch.
     */
    where: CommentaryWhereUniqueInput
  }

  /**
   * Commentary findFirst
   */
  export type CommentaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * Filter, which Commentary to fetch.
     */
    where?: CommentaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commentaries to fetch.
     */
    orderBy?: CommentaryOrderByWithRelationInput | CommentaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commentaries.
     */
    cursor?: CommentaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commentaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commentaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commentaries.
     */
    distinct?: CommentaryScalarFieldEnum | CommentaryScalarFieldEnum[]
  }

  /**
   * Commentary findFirstOrThrow
   */
  export type CommentaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * Filter, which Commentary to fetch.
     */
    where?: CommentaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commentaries to fetch.
     */
    orderBy?: CommentaryOrderByWithRelationInput | CommentaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commentaries.
     */
    cursor?: CommentaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commentaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commentaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commentaries.
     */
    distinct?: CommentaryScalarFieldEnum | CommentaryScalarFieldEnum[]
  }

  /**
   * Commentary findMany
   */
  export type CommentaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * Filter, which Commentaries to fetch.
     */
    where?: CommentaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commentaries to fetch.
     */
    orderBy?: CommentaryOrderByWithRelationInput | CommentaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Commentaries.
     */
    cursor?: CommentaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commentaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commentaries.
     */
    skip?: number
    distinct?: CommentaryScalarFieldEnum | CommentaryScalarFieldEnum[]
  }

  /**
   * Commentary create
   */
  export type CommentaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * The data needed to create a Commentary.
     */
    data: XOR<CommentaryCreateInput, CommentaryUncheckedCreateInput>
  }

  /**
   * Commentary createMany
   */
  export type CommentaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Commentaries.
     */
    data: CommentaryCreateManyInput | CommentaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Commentary createManyAndReturn
   */
  export type CommentaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * The data used to create many Commentaries.
     */
    data: CommentaryCreateManyInput | CommentaryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Commentary update
   */
  export type CommentaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * The data needed to update a Commentary.
     */
    data: XOR<CommentaryUpdateInput, CommentaryUncheckedUpdateInput>
    /**
     * Choose, which Commentary to update.
     */
    where: CommentaryWhereUniqueInput
  }

  /**
   * Commentary updateMany
   */
  export type CommentaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Commentaries.
     */
    data: XOR<CommentaryUpdateManyMutationInput, CommentaryUncheckedUpdateManyInput>
    /**
     * Filter which Commentaries to update
     */
    where?: CommentaryWhereInput
    /**
     * Limit how many Commentaries to update.
     */
    limit?: number
  }

  /**
   * Commentary updateManyAndReturn
   */
  export type CommentaryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * The data used to update Commentaries.
     */
    data: XOR<CommentaryUpdateManyMutationInput, CommentaryUncheckedUpdateManyInput>
    /**
     * Filter which Commentaries to update
     */
    where?: CommentaryWhereInput
    /**
     * Limit how many Commentaries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Commentary upsert
   */
  export type CommentaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * The filter to search for the Commentary to update in case it exists.
     */
    where: CommentaryWhereUniqueInput
    /**
     * In case the Commentary found by the `where` argument doesn't exist, create a new Commentary with this data.
     */
    create: XOR<CommentaryCreateInput, CommentaryUncheckedCreateInput>
    /**
     * In case the Commentary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentaryUpdateInput, CommentaryUncheckedUpdateInput>
  }

  /**
   * Commentary delete
   */
  export type CommentaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
    /**
     * Filter which Commentary to delete.
     */
    where: CommentaryWhereUniqueInput
  }

  /**
   * Commentary deleteMany
   */
  export type CommentaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commentaries to delete
     */
    where?: CommentaryWhereInput
    /**
     * Limit how many Commentaries to delete.
     */
    limit?: number
  }

  /**
   * Commentary.events
   */
  export type Commentary$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentaryEvent
     */
    select?: CommentaryEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentaryEvent
     */
    omit?: CommentaryEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryEventInclude<ExtArgs> | null
    where?: CommentaryEventWhereInput
    orderBy?: CommentaryEventOrderByWithRelationInput | CommentaryEventOrderByWithRelationInput[]
    cursor?: CommentaryEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentaryEventScalarFieldEnum | CommentaryEventScalarFieldEnum[]
  }

  /**
   * Commentary.syncReports
   */
  export type Commentary$syncReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncReport
     */
    select?: SyncReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncReport
     */
    omit?: SyncReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncReportInclude<ExtArgs> | null
    where?: SyncReportWhereInput
    orderBy?: SyncReportOrderByWithRelationInput | SyncReportOrderByWithRelationInput[]
    cursor?: SyncReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SyncReportScalarFieldEnum | SyncReportScalarFieldEnum[]
  }

  /**
   * Commentary without action
   */
  export type CommentaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commentary
     */
    select?: CommentarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commentary
     */
    omit?: CommentaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryInclude<ExtArgs> | null
  }


  /**
   * Model MatchEvent
   */

  export type AggregateMatchEvent = {
    _count: MatchEventCountAggregateOutputType | null
    _avg: MatchEventAvgAggregateOutputType | null
    _sum: MatchEventSumAggregateOutputType | null
    _min: MatchEventMinAggregateOutputType | null
    _max: MatchEventMaxAggregateOutputType | null
  }

  export type MatchEventAvgAggregateOutputType = {
    minute: number | null
  }

  export type MatchEventSumAggregateOutputType = {
    minute: number | null
  }

  export type MatchEventMinAggregateOutputType = {
    id: string | null
    matchId: string | null
    type: string | null
    team: string | null
    player: string | null
    minute: number | null
    timestamp: Date | null
    description: string | null
    createdAt: Date | null
  }

  export type MatchEventMaxAggregateOutputType = {
    id: string | null
    matchId: string | null
    type: string | null
    team: string | null
    player: string | null
    minute: number | null
    timestamp: Date | null
    description: string | null
    createdAt: Date | null
  }

  export type MatchEventCountAggregateOutputType = {
    id: number
    matchId: number
    type: number
    team: number
    player: number
    minute: number
    timestamp: number
    description: number
    createdAt: number
    _all: number
  }


  export type MatchEventAvgAggregateInputType = {
    minute?: true
  }

  export type MatchEventSumAggregateInputType = {
    minute?: true
  }

  export type MatchEventMinAggregateInputType = {
    id?: true
    matchId?: true
    type?: true
    team?: true
    player?: true
    minute?: true
    timestamp?: true
    description?: true
    createdAt?: true
  }

  export type MatchEventMaxAggregateInputType = {
    id?: true
    matchId?: true
    type?: true
    team?: true
    player?: true
    minute?: true
    timestamp?: true
    description?: true
    createdAt?: true
  }

  export type MatchEventCountAggregateInputType = {
    id?: true
    matchId?: true
    type?: true
    team?: true
    player?: true
    minute?: true
    timestamp?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type MatchEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchEvent to aggregate.
     */
    where?: MatchEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchEvents to fetch.
     */
    orderBy?: MatchEventOrderByWithRelationInput | MatchEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MatchEvents
    **/
    _count?: true | MatchEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchEventMaxAggregateInputType
  }

  export type GetMatchEventAggregateType<T extends MatchEventAggregateArgs> = {
        [P in keyof T & keyof AggregateMatchEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatchEvent[P]>
      : GetScalarType<T[P], AggregateMatchEvent[P]>
  }




  export type MatchEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchEventWhereInput
    orderBy?: MatchEventOrderByWithAggregationInput | MatchEventOrderByWithAggregationInput[]
    by: MatchEventScalarFieldEnum[] | MatchEventScalarFieldEnum
    having?: MatchEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchEventCountAggregateInputType | true
    _avg?: MatchEventAvgAggregateInputType
    _sum?: MatchEventSumAggregateInputType
    _min?: MatchEventMinAggregateInputType
    _max?: MatchEventMaxAggregateInputType
  }

  export type MatchEventGroupByOutputType = {
    id: string
    matchId: string
    type: string
    team: string | null
    player: string | null
    minute: number
    timestamp: Date
    description: string | null
    createdAt: Date
    _count: MatchEventCountAggregateOutputType | null
    _avg: MatchEventAvgAggregateOutputType | null
    _sum: MatchEventSumAggregateOutputType | null
    _min: MatchEventMinAggregateOutputType | null
    _max: MatchEventMaxAggregateOutputType | null
  }

  type GetMatchEventGroupByPayload<T extends MatchEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchEventGroupByOutputType[P]>
            : GetScalarType<T[P], MatchEventGroupByOutputType[P]>
        }
      >
    >


  export type MatchEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    type?: boolean
    team?: boolean
    player?: boolean
    minute?: boolean
    timestamp?: boolean
    description?: boolean
    createdAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchEvent"]>

  export type MatchEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    type?: boolean
    team?: boolean
    player?: boolean
    minute?: boolean
    timestamp?: boolean
    description?: boolean
    createdAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchEvent"]>

  export type MatchEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    type?: boolean
    team?: boolean
    player?: boolean
    minute?: boolean
    timestamp?: boolean
    description?: boolean
    createdAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchEvent"]>

  export type MatchEventSelectScalar = {
    id?: boolean
    matchId?: boolean
    type?: boolean
    team?: boolean
    player?: boolean
    minute?: boolean
    timestamp?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type MatchEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "matchId" | "type" | "team" | "player" | "minute" | "timestamp" | "description" | "createdAt", ExtArgs["result"]["matchEvent"]>
  export type MatchEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }
  export type MatchEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }
  export type MatchEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }

  export type $MatchEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MatchEvent"
    objects: {
      match: Prisma.$MatchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      matchId: string
      type: string
      team: string | null
      player: string | null
      minute: number
      timestamp: Date
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["matchEvent"]>
    composites: {}
  }

  type MatchEventGetPayload<S extends boolean | null | undefined | MatchEventDefaultArgs> = $Result.GetResult<Prisma.$MatchEventPayload, S>

  type MatchEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchEventCountAggregateInputType | true
    }

  export interface MatchEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MatchEvent'], meta: { name: 'MatchEvent' } }
    /**
     * Find zero or one MatchEvent that matches the filter.
     * @param {MatchEventFindUniqueArgs} args - Arguments to find a MatchEvent
     * @example
     * // Get one MatchEvent
     * const matchEvent = await prisma.matchEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchEventFindUniqueArgs>(args: SelectSubset<T, MatchEventFindUniqueArgs<ExtArgs>>): Prisma__MatchEventClient<$Result.GetResult<Prisma.$MatchEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MatchEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchEventFindUniqueOrThrowArgs} args - Arguments to find a MatchEvent
     * @example
     * // Get one MatchEvent
     * const matchEvent = await prisma.matchEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchEventFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchEventClient<$Result.GetResult<Prisma.$MatchEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchEventFindFirstArgs} args - Arguments to find a MatchEvent
     * @example
     * // Get one MatchEvent
     * const matchEvent = await prisma.matchEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchEventFindFirstArgs>(args?: SelectSubset<T, MatchEventFindFirstArgs<ExtArgs>>): Prisma__MatchEventClient<$Result.GetResult<Prisma.$MatchEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchEventFindFirstOrThrowArgs} args - Arguments to find a MatchEvent
     * @example
     * // Get one MatchEvent
     * const matchEvent = await prisma.matchEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchEventFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchEventClient<$Result.GetResult<Prisma.$MatchEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MatchEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatchEvents
     * const matchEvents = await prisma.matchEvent.findMany()
     * 
     * // Get first 10 MatchEvents
     * const matchEvents = await prisma.matchEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchEventWithIdOnly = await prisma.matchEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchEventFindManyArgs>(args?: SelectSubset<T, MatchEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MatchEvent.
     * @param {MatchEventCreateArgs} args - Arguments to create a MatchEvent.
     * @example
     * // Create one MatchEvent
     * const MatchEvent = await prisma.matchEvent.create({
     *   data: {
     *     // ... data to create a MatchEvent
     *   }
     * })
     * 
     */
    create<T extends MatchEventCreateArgs>(args: SelectSubset<T, MatchEventCreateArgs<ExtArgs>>): Prisma__MatchEventClient<$Result.GetResult<Prisma.$MatchEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MatchEvents.
     * @param {MatchEventCreateManyArgs} args - Arguments to create many MatchEvents.
     * @example
     * // Create many MatchEvents
     * const matchEvent = await prisma.matchEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchEventCreateManyArgs>(args?: SelectSubset<T, MatchEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MatchEvents and returns the data saved in the database.
     * @param {MatchEventCreateManyAndReturnArgs} args - Arguments to create many MatchEvents.
     * @example
     * // Create many MatchEvents
     * const matchEvent = await prisma.matchEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MatchEvents and only return the `id`
     * const matchEventWithIdOnly = await prisma.matchEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchEventCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MatchEvent.
     * @param {MatchEventDeleteArgs} args - Arguments to delete one MatchEvent.
     * @example
     * // Delete one MatchEvent
     * const MatchEvent = await prisma.matchEvent.delete({
     *   where: {
     *     // ... filter to delete one MatchEvent
     *   }
     * })
     * 
     */
    delete<T extends MatchEventDeleteArgs>(args: SelectSubset<T, MatchEventDeleteArgs<ExtArgs>>): Prisma__MatchEventClient<$Result.GetResult<Prisma.$MatchEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MatchEvent.
     * @param {MatchEventUpdateArgs} args - Arguments to update one MatchEvent.
     * @example
     * // Update one MatchEvent
     * const matchEvent = await prisma.matchEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchEventUpdateArgs>(args: SelectSubset<T, MatchEventUpdateArgs<ExtArgs>>): Prisma__MatchEventClient<$Result.GetResult<Prisma.$MatchEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MatchEvents.
     * @param {MatchEventDeleteManyArgs} args - Arguments to filter MatchEvents to delete.
     * @example
     * // Delete a few MatchEvents
     * const { count } = await prisma.matchEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchEventDeleteManyArgs>(args?: SelectSubset<T, MatchEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatchEvents
     * const matchEvent = await prisma.matchEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchEventUpdateManyArgs>(args: SelectSubset<T, MatchEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchEvents and returns the data updated in the database.
     * @param {MatchEventUpdateManyAndReturnArgs} args - Arguments to update many MatchEvents.
     * @example
     * // Update many MatchEvents
     * const matchEvent = await prisma.matchEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MatchEvents and only return the `id`
     * const matchEventWithIdOnly = await prisma.matchEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchEventUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MatchEvent.
     * @param {MatchEventUpsertArgs} args - Arguments to update or create a MatchEvent.
     * @example
     * // Update or create a MatchEvent
     * const matchEvent = await prisma.matchEvent.upsert({
     *   create: {
     *     // ... data to create a MatchEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatchEvent we want to update
     *   }
     * })
     */
    upsert<T extends MatchEventUpsertArgs>(args: SelectSubset<T, MatchEventUpsertArgs<ExtArgs>>): Prisma__MatchEventClient<$Result.GetResult<Prisma.$MatchEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MatchEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchEventCountArgs} args - Arguments to filter MatchEvents to count.
     * @example
     * // Count the number of MatchEvents
     * const count = await prisma.matchEvent.count({
     *   where: {
     *     // ... the filter for the MatchEvents we want to count
     *   }
     * })
    **/
    count<T extends MatchEventCountArgs>(
      args?: Subset<T, MatchEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MatchEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchEventAggregateArgs>(args: Subset<T, MatchEventAggregateArgs>): Prisma.PrismaPromise<GetMatchEventAggregateType<T>>

    /**
     * Group by MatchEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchEventGroupByArgs['orderBy'] }
        : { orderBy?: MatchEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MatchEvent model
   */
  readonly fields: MatchEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatchEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    match<T extends MatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MatchDefaultArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MatchEvent model
   */
  interface MatchEventFieldRefs {
    readonly id: FieldRef<"MatchEvent", 'String'>
    readonly matchId: FieldRef<"MatchEvent", 'String'>
    readonly type: FieldRef<"MatchEvent", 'String'>
    readonly team: FieldRef<"MatchEvent", 'String'>
    readonly player: FieldRef<"MatchEvent", 'String'>
    readonly minute: FieldRef<"MatchEvent", 'Int'>
    readonly timestamp: FieldRef<"MatchEvent", 'DateTime'>
    readonly description: FieldRef<"MatchEvent", 'String'>
    readonly createdAt: FieldRef<"MatchEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MatchEvent findUnique
   */
  export type MatchEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvent
     */
    select?: MatchEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvent
     */
    omit?: MatchEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEventInclude<ExtArgs> | null
    /**
     * Filter, which MatchEvent to fetch.
     */
    where: MatchEventWhereUniqueInput
  }

  /**
   * MatchEvent findUniqueOrThrow
   */
  export type MatchEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvent
     */
    select?: MatchEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvent
     */
    omit?: MatchEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEventInclude<ExtArgs> | null
    /**
     * Filter, which MatchEvent to fetch.
     */
    where: MatchEventWhereUniqueInput
  }

  /**
   * MatchEvent findFirst
   */
  export type MatchEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvent
     */
    select?: MatchEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvent
     */
    omit?: MatchEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEventInclude<ExtArgs> | null
    /**
     * Filter, which MatchEvent to fetch.
     */
    where?: MatchEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchEvents to fetch.
     */
    orderBy?: MatchEventOrderByWithRelationInput | MatchEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchEvents.
     */
    cursor?: MatchEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchEvents.
     */
    distinct?: MatchEventScalarFieldEnum | MatchEventScalarFieldEnum[]
  }

  /**
   * MatchEvent findFirstOrThrow
   */
  export type MatchEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvent
     */
    select?: MatchEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvent
     */
    omit?: MatchEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEventInclude<ExtArgs> | null
    /**
     * Filter, which MatchEvent to fetch.
     */
    where?: MatchEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchEvents to fetch.
     */
    orderBy?: MatchEventOrderByWithRelationInput | MatchEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchEvents.
     */
    cursor?: MatchEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchEvents.
     */
    distinct?: MatchEventScalarFieldEnum | MatchEventScalarFieldEnum[]
  }

  /**
   * MatchEvent findMany
   */
  export type MatchEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvent
     */
    select?: MatchEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvent
     */
    omit?: MatchEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEventInclude<ExtArgs> | null
    /**
     * Filter, which MatchEvents to fetch.
     */
    where?: MatchEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchEvents to fetch.
     */
    orderBy?: MatchEventOrderByWithRelationInput | MatchEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MatchEvents.
     */
    cursor?: MatchEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchEvents.
     */
    skip?: number
    distinct?: MatchEventScalarFieldEnum | MatchEventScalarFieldEnum[]
  }

  /**
   * MatchEvent create
   */
  export type MatchEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvent
     */
    select?: MatchEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvent
     */
    omit?: MatchEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEventInclude<ExtArgs> | null
    /**
     * The data needed to create a MatchEvent.
     */
    data: XOR<MatchEventCreateInput, MatchEventUncheckedCreateInput>
  }

  /**
   * MatchEvent createMany
   */
  export type MatchEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatchEvents.
     */
    data: MatchEventCreateManyInput | MatchEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatchEvent createManyAndReturn
   */
  export type MatchEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvent
     */
    select?: MatchEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvent
     */
    omit?: MatchEventOmit<ExtArgs> | null
    /**
     * The data used to create many MatchEvents.
     */
    data: MatchEventCreateManyInput | MatchEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchEvent update
   */
  export type MatchEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvent
     */
    select?: MatchEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvent
     */
    omit?: MatchEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEventInclude<ExtArgs> | null
    /**
     * The data needed to update a MatchEvent.
     */
    data: XOR<MatchEventUpdateInput, MatchEventUncheckedUpdateInput>
    /**
     * Choose, which MatchEvent to update.
     */
    where: MatchEventWhereUniqueInput
  }

  /**
   * MatchEvent updateMany
   */
  export type MatchEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatchEvents.
     */
    data: XOR<MatchEventUpdateManyMutationInput, MatchEventUncheckedUpdateManyInput>
    /**
     * Filter which MatchEvents to update
     */
    where?: MatchEventWhereInput
    /**
     * Limit how many MatchEvents to update.
     */
    limit?: number
  }

  /**
   * MatchEvent updateManyAndReturn
   */
  export type MatchEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvent
     */
    select?: MatchEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvent
     */
    omit?: MatchEventOmit<ExtArgs> | null
    /**
     * The data used to update MatchEvents.
     */
    data: XOR<MatchEventUpdateManyMutationInput, MatchEventUncheckedUpdateManyInput>
    /**
     * Filter which MatchEvents to update
     */
    where?: MatchEventWhereInput
    /**
     * Limit how many MatchEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchEvent upsert
   */
  export type MatchEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvent
     */
    select?: MatchEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvent
     */
    omit?: MatchEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEventInclude<ExtArgs> | null
    /**
     * The filter to search for the MatchEvent to update in case it exists.
     */
    where: MatchEventWhereUniqueInput
    /**
     * In case the MatchEvent found by the `where` argument doesn't exist, create a new MatchEvent with this data.
     */
    create: XOR<MatchEventCreateInput, MatchEventUncheckedCreateInput>
    /**
     * In case the MatchEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchEventUpdateInput, MatchEventUncheckedUpdateInput>
  }

  /**
   * MatchEvent delete
   */
  export type MatchEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvent
     */
    select?: MatchEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvent
     */
    omit?: MatchEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEventInclude<ExtArgs> | null
    /**
     * Filter which MatchEvent to delete.
     */
    where: MatchEventWhereUniqueInput
  }

  /**
   * MatchEvent deleteMany
   */
  export type MatchEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchEvents to delete
     */
    where?: MatchEventWhereInput
    /**
     * Limit how many MatchEvents to delete.
     */
    limit?: number
  }

  /**
   * MatchEvent without action
   */
  export type MatchEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvent
     */
    select?: MatchEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvent
     */
    omit?: MatchEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEventInclude<ExtArgs> | null
  }


  /**
   * Model CommentaryEvent
   */

  export type AggregateCommentaryEvent = {
    _count: CommentaryEventCountAggregateOutputType | null
    _avg: CommentaryEventAvgAggregateOutputType | null
    _sum: CommentaryEventSumAggregateOutputType | null
    _min: CommentaryEventMinAggregateOutputType | null
    _max: CommentaryEventMaxAggregateOutputType | null
  }

  export type CommentaryEventAvgAggregateOutputType = {
    gameMinute: number | null
    audioTimestamp: number | null
  }

  export type CommentaryEventSumAggregateOutputType = {
    gameMinute: number | null
    audioTimestamp: number | null
  }

  export type CommentaryEventMinAggregateOutputType = {
    id: string | null
    commentaryId: string | null
    type: string | null
    gameMinute: number | null
    audioTimestamp: number | null
    timestamp: Date | null
    createdAt: Date | null
  }

  export type CommentaryEventMaxAggregateOutputType = {
    id: string | null
    commentaryId: string | null
    type: string | null
    gameMinute: number | null
    audioTimestamp: number | null
    timestamp: Date | null
    createdAt: Date | null
  }

  export type CommentaryEventCountAggregateOutputType = {
    id: number
    commentaryId: number
    type: number
    gameMinute: number
    audioTimestamp: number
    timestamp: number
    createdAt: number
    _all: number
  }


  export type CommentaryEventAvgAggregateInputType = {
    gameMinute?: true
    audioTimestamp?: true
  }

  export type CommentaryEventSumAggregateInputType = {
    gameMinute?: true
    audioTimestamp?: true
  }

  export type CommentaryEventMinAggregateInputType = {
    id?: true
    commentaryId?: true
    type?: true
    gameMinute?: true
    audioTimestamp?: true
    timestamp?: true
    createdAt?: true
  }

  export type CommentaryEventMaxAggregateInputType = {
    id?: true
    commentaryId?: true
    type?: true
    gameMinute?: true
    audioTimestamp?: true
    timestamp?: true
    createdAt?: true
  }

  export type CommentaryEventCountAggregateInputType = {
    id?: true
    commentaryId?: true
    type?: true
    gameMinute?: true
    audioTimestamp?: true
    timestamp?: true
    createdAt?: true
    _all?: true
  }

  export type CommentaryEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommentaryEvent to aggregate.
     */
    where?: CommentaryEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentaryEvents to fetch.
     */
    orderBy?: CommentaryEventOrderByWithRelationInput | CommentaryEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentaryEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentaryEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentaryEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CommentaryEvents
    **/
    _count?: true | CommentaryEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentaryEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentaryEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentaryEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentaryEventMaxAggregateInputType
  }

  export type GetCommentaryEventAggregateType<T extends CommentaryEventAggregateArgs> = {
        [P in keyof T & keyof AggregateCommentaryEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommentaryEvent[P]>
      : GetScalarType<T[P], AggregateCommentaryEvent[P]>
  }




  export type CommentaryEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentaryEventWhereInput
    orderBy?: CommentaryEventOrderByWithAggregationInput | CommentaryEventOrderByWithAggregationInput[]
    by: CommentaryEventScalarFieldEnum[] | CommentaryEventScalarFieldEnum
    having?: CommentaryEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentaryEventCountAggregateInputType | true
    _avg?: CommentaryEventAvgAggregateInputType
    _sum?: CommentaryEventSumAggregateInputType
    _min?: CommentaryEventMinAggregateInputType
    _max?: CommentaryEventMaxAggregateInputType
  }

  export type CommentaryEventGroupByOutputType = {
    id: string
    commentaryId: string
    type: string
    gameMinute: number
    audioTimestamp: number
    timestamp: Date
    createdAt: Date
    _count: CommentaryEventCountAggregateOutputType | null
    _avg: CommentaryEventAvgAggregateOutputType | null
    _sum: CommentaryEventSumAggregateOutputType | null
    _min: CommentaryEventMinAggregateOutputType | null
    _max: CommentaryEventMaxAggregateOutputType | null
  }

  type GetCommentaryEventGroupByPayload<T extends CommentaryEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentaryEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentaryEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentaryEventGroupByOutputType[P]>
            : GetScalarType<T[P], CommentaryEventGroupByOutputType[P]>
        }
      >
    >


  export type CommentaryEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentaryId?: boolean
    type?: boolean
    gameMinute?: boolean
    audioTimestamp?: boolean
    timestamp?: boolean
    createdAt?: boolean
    commentary?: boolean | CommentaryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentaryEvent"]>

  export type CommentaryEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentaryId?: boolean
    type?: boolean
    gameMinute?: boolean
    audioTimestamp?: boolean
    timestamp?: boolean
    createdAt?: boolean
    commentary?: boolean | CommentaryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentaryEvent"]>

  export type CommentaryEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentaryId?: boolean
    type?: boolean
    gameMinute?: boolean
    audioTimestamp?: boolean
    timestamp?: boolean
    createdAt?: boolean
    commentary?: boolean | CommentaryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentaryEvent"]>

  export type CommentaryEventSelectScalar = {
    id?: boolean
    commentaryId?: boolean
    type?: boolean
    gameMinute?: boolean
    audioTimestamp?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }

  export type CommentaryEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "commentaryId" | "type" | "gameMinute" | "audioTimestamp" | "timestamp" | "createdAt", ExtArgs["result"]["commentaryEvent"]>
  export type CommentaryEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commentary?: boolean | CommentaryDefaultArgs<ExtArgs>
  }
  export type CommentaryEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commentary?: boolean | CommentaryDefaultArgs<ExtArgs>
  }
  export type CommentaryEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commentary?: boolean | CommentaryDefaultArgs<ExtArgs>
  }

  export type $CommentaryEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CommentaryEvent"
    objects: {
      commentary: Prisma.$CommentaryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      commentaryId: string
      type: string
      gameMinute: number
      audioTimestamp: number
      timestamp: Date
      createdAt: Date
    }, ExtArgs["result"]["commentaryEvent"]>
    composites: {}
  }

  type CommentaryEventGetPayload<S extends boolean | null | undefined | CommentaryEventDefaultArgs> = $Result.GetResult<Prisma.$CommentaryEventPayload, S>

  type CommentaryEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentaryEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentaryEventCountAggregateInputType | true
    }

  export interface CommentaryEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CommentaryEvent'], meta: { name: 'CommentaryEvent' } }
    /**
     * Find zero or one CommentaryEvent that matches the filter.
     * @param {CommentaryEventFindUniqueArgs} args - Arguments to find a CommentaryEvent
     * @example
     * // Get one CommentaryEvent
     * const commentaryEvent = await prisma.commentaryEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentaryEventFindUniqueArgs>(args: SelectSubset<T, CommentaryEventFindUniqueArgs<ExtArgs>>): Prisma__CommentaryEventClient<$Result.GetResult<Prisma.$CommentaryEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CommentaryEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentaryEventFindUniqueOrThrowArgs} args - Arguments to find a CommentaryEvent
     * @example
     * // Get one CommentaryEvent
     * const commentaryEvent = await prisma.commentaryEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentaryEventFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentaryEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentaryEventClient<$Result.GetResult<Prisma.$CommentaryEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommentaryEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryEventFindFirstArgs} args - Arguments to find a CommentaryEvent
     * @example
     * // Get one CommentaryEvent
     * const commentaryEvent = await prisma.commentaryEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentaryEventFindFirstArgs>(args?: SelectSubset<T, CommentaryEventFindFirstArgs<ExtArgs>>): Prisma__CommentaryEventClient<$Result.GetResult<Prisma.$CommentaryEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommentaryEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryEventFindFirstOrThrowArgs} args - Arguments to find a CommentaryEvent
     * @example
     * // Get one CommentaryEvent
     * const commentaryEvent = await prisma.commentaryEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentaryEventFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentaryEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentaryEventClient<$Result.GetResult<Prisma.$CommentaryEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CommentaryEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CommentaryEvents
     * const commentaryEvents = await prisma.commentaryEvent.findMany()
     * 
     * // Get first 10 CommentaryEvents
     * const commentaryEvents = await prisma.commentaryEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentaryEventWithIdOnly = await prisma.commentaryEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentaryEventFindManyArgs>(args?: SelectSubset<T, CommentaryEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentaryEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CommentaryEvent.
     * @param {CommentaryEventCreateArgs} args - Arguments to create a CommentaryEvent.
     * @example
     * // Create one CommentaryEvent
     * const CommentaryEvent = await prisma.commentaryEvent.create({
     *   data: {
     *     // ... data to create a CommentaryEvent
     *   }
     * })
     * 
     */
    create<T extends CommentaryEventCreateArgs>(args: SelectSubset<T, CommentaryEventCreateArgs<ExtArgs>>): Prisma__CommentaryEventClient<$Result.GetResult<Prisma.$CommentaryEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CommentaryEvents.
     * @param {CommentaryEventCreateManyArgs} args - Arguments to create many CommentaryEvents.
     * @example
     * // Create many CommentaryEvents
     * const commentaryEvent = await prisma.commentaryEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentaryEventCreateManyArgs>(args?: SelectSubset<T, CommentaryEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CommentaryEvents and returns the data saved in the database.
     * @param {CommentaryEventCreateManyAndReturnArgs} args - Arguments to create many CommentaryEvents.
     * @example
     * // Create many CommentaryEvents
     * const commentaryEvent = await prisma.commentaryEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CommentaryEvents and only return the `id`
     * const commentaryEventWithIdOnly = await prisma.commentaryEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentaryEventCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentaryEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentaryEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CommentaryEvent.
     * @param {CommentaryEventDeleteArgs} args - Arguments to delete one CommentaryEvent.
     * @example
     * // Delete one CommentaryEvent
     * const CommentaryEvent = await prisma.commentaryEvent.delete({
     *   where: {
     *     // ... filter to delete one CommentaryEvent
     *   }
     * })
     * 
     */
    delete<T extends CommentaryEventDeleteArgs>(args: SelectSubset<T, CommentaryEventDeleteArgs<ExtArgs>>): Prisma__CommentaryEventClient<$Result.GetResult<Prisma.$CommentaryEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CommentaryEvent.
     * @param {CommentaryEventUpdateArgs} args - Arguments to update one CommentaryEvent.
     * @example
     * // Update one CommentaryEvent
     * const commentaryEvent = await prisma.commentaryEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentaryEventUpdateArgs>(args: SelectSubset<T, CommentaryEventUpdateArgs<ExtArgs>>): Prisma__CommentaryEventClient<$Result.GetResult<Prisma.$CommentaryEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CommentaryEvents.
     * @param {CommentaryEventDeleteManyArgs} args - Arguments to filter CommentaryEvents to delete.
     * @example
     * // Delete a few CommentaryEvents
     * const { count } = await prisma.commentaryEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentaryEventDeleteManyArgs>(args?: SelectSubset<T, CommentaryEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommentaryEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CommentaryEvents
     * const commentaryEvent = await prisma.commentaryEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentaryEventUpdateManyArgs>(args: SelectSubset<T, CommentaryEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommentaryEvents and returns the data updated in the database.
     * @param {CommentaryEventUpdateManyAndReturnArgs} args - Arguments to update many CommentaryEvents.
     * @example
     * // Update many CommentaryEvents
     * const commentaryEvent = await prisma.commentaryEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CommentaryEvents and only return the `id`
     * const commentaryEventWithIdOnly = await prisma.commentaryEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentaryEventUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentaryEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentaryEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CommentaryEvent.
     * @param {CommentaryEventUpsertArgs} args - Arguments to update or create a CommentaryEvent.
     * @example
     * // Update or create a CommentaryEvent
     * const commentaryEvent = await prisma.commentaryEvent.upsert({
     *   create: {
     *     // ... data to create a CommentaryEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CommentaryEvent we want to update
     *   }
     * })
     */
    upsert<T extends CommentaryEventUpsertArgs>(args: SelectSubset<T, CommentaryEventUpsertArgs<ExtArgs>>): Prisma__CommentaryEventClient<$Result.GetResult<Prisma.$CommentaryEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CommentaryEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryEventCountArgs} args - Arguments to filter CommentaryEvents to count.
     * @example
     * // Count the number of CommentaryEvents
     * const count = await prisma.commentaryEvent.count({
     *   where: {
     *     // ... the filter for the CommentaryEvents we want to count
     *   }
     * })
    **/
    count<T extends CommentaryEventCountArgs>(
      args?: Subset<T, CommentaryEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentaryEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CommentaryEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentaryEventAggregateArgs>(args: Subset<T, CommentaryEventAggregateArgs>): Prisma.PrismaPromise<GetCommentaryEventAggregateType<T>>

    /**
     * Group by CommentaryEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentaryEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentaryEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentaryEventGroupByArgs['orderBy'] }
        : { orderBy?: CommentaryEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentaryEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentaryEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CommentaryEvent model
   */
  readonly fields: CommentaryEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CommentaryEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentaryEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    commentary<T extends CommentaryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CommentaryDefaultArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CommentaryEvent model
   */
  interface CommentaryEventFieldRefs {
    readonly id: FieldRef<"CommentaryEvent", 'String'>
    readonly commentaryId: FieldRef<"CommentaryEvent", 'String'>
    readonly type: FieldRef<"CommentaryEvent", 'String'>
    readonly gameMinute: FieldRef<"CommentaryEvent", 'Int'>
    readonly audioTimestamp: FieldRef<"CommentaryEvent", 'Int'>
    readonly timestamp: FieldRef<"CommentaryEvent", 'DateTime'>
    readonly createdAt: FieldRef<"CommentaryEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CommentaryEvent findUnique
   */
  export type CommentaryEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentaryEvent
     */
    select?: CommentaryEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentaryEvent
     */
    omit?: CommentaryEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryEventInclude<ExtArgs> | null
    /**
     * Filter, which CommentaryEvent to fetch.
     */
    where: CommentaryEventWhereUniqueInput
  }

  /**
   * CommentaryEvent findUniqueOrThrow
   */
  export type CommentaryEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentaryEvent
     */
    select?: CommentaryEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentaryEvent
     */
    omit?: CommentaryEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryEventInclude<ExtArgs> | null
    /**
     * Filter, which CommentaryEvent to fetch.
     */
    where: CommentaryEventWhereUniqueInput
  }

  /**
   * CommentaryEvent findFirst
   */
  export type CommentaryEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentaryEvent
     */
    select?: CommentaryEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentaryEvent
     */
    omit?: CommentaryEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryEventInclude<ExtArgs> | null
    /**
     * Filter, which CommentaryEvent to fetch.
     */
    where?: CommentaryEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentaryEvents to fetch.
     */
    orderBy?: CommentaryEventOrderByWithRelationInput | CommentaryEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommentaryEvents.
     */
    cursor?: CommentaryEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentaryEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentaryEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommentaryEvents.
     */
    distinct?: CommentaryEventScalarFieldEnum | CommentaryEventScalarFieldEnum[]
  }

  /**
   * CommentaryEvent findFirstOrThrow
   */
  export type CommentaryEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentaryEvent
     */
    select?: CommentaryEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentaryEvent
     */
    omit?: CommentaryEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryEventInclude<ExtArgs> | null
    /**
     * Filter, which CommentaryEvent to fetch.
     */
    where?: CommentaryEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentaryEvents to fetch.
     */
    orderBy?: CommentaryEventOrderByWithRelationInput | CommentaryEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommentaryEvents.
     */
    cursor?: CommentaryEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentaryEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentaryEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommentaryEvents.
     */
    distinct?: CommentaryEventScalarFieldEnum | CommentaryEventScalarFieldEnum[]
  }

  /**
   * CommentaryEvent findMany
   */
  export type CommentaryEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentaryEvent
     */
    select?: CommentaryEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentaryEvent
     */
    omit?: CommentaryEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryEventInclude<ExtArgs> | null
    /**
     * Filter, which CommentaryEvents to fetch.
     */
    where?: CommentaryEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentaryEvents to fetch.
     */
    orderBy?: CommentaryEventOrderByWithRelationInput | CommentaryEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CommentaryEvents.
     */
    cursor?: CommentaryEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentaryEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentaryEvents.
     */
    skip?: number
    distinct?: CommentaryEventScalarFieldEnum | CommentaryEventScalarFieldEnum[]
  }

  /**
   * CommentaryEvent create
   */
  export type CommentaryEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentaryEvent
     */
    select?: CommentaryEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentaryEvent
     */
    omit?: CommentaryEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryEventInclude<ExtArgs> | null
    /**
     * The data needed to create a CommentaryEvent.
     */
    data: XOR<CommentaryEventCreateInput, CommentaryEventUncheckedCreateInput>
  }

  /**
   * CommentaryEvent createMany
   */
  export type CommentaryEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CommentaryEvents.
     */
    data: CommentaryEventCreateManyInput | CommentaryEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CommentaryEvent createManyAndReturn
   */
  export type CommentaryEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentaryEvent
     */
    select?: CommentaryEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommentaryEvent
     */
    omit?: CommentaryEventOmit<ExtArgs> | null
    /**
     * The data used to create many CommentaryEvents.
     */
    data: CommentaryEventCreateManyInput | CommentaryEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CommentaryEvent update
   */
  export type CommentaryEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentaryEvent
     */
    select?: CommentaryEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentaryEvent
     */
    omit?: CommentaryEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryEventInclude<ExtArgs> | null
    /**
     * The data needed to update a CommentaryEvent.
     */
    data: XOR<CommentaryEventUpdateInput, CommentaryEventUncheckedUpdateInput>
    /**
     * Choose, which CommentaryEvent to update.
     */
    where: CommentaryEventWhereUniqueInput
  }

  /**
   * CommentaryEvent updateMany
   */
  export type CommentaryEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CommentaryEvents.
     */
    data: XOR<CommentaryEventUpdateManyMutationInput, CommentaryEventUncheckedUpdateManyInput>
    /**
     * Filter which CommentaryEvents to update
     */
    where?: CommentaryEventWhereInput
    /**
     * Limit how many CommentaryEvents to update.
     */
    limit?: number
  }

  /**
   * CommentaryEvent updateManyAndReturn
   */
  export type CommentaryEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentaryEvent
     */
    select?: CommentaryEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommentaryEvent
     */
    omit?: CommentaryEventOmit<ExtArgs> | null
    /**
     * The data used to update CommentaryEvents.
     */
    data: XOR<CommentaryEventUpdateManyMutationInput, CommentaryEventUncheckedUpdateManyInput>
    /**
     * Filter which CommentaryEvents to update
     */
    where?: CommentaryEventWhereInput
    /**
     * Limit how many CommentaryEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CommentaryEvent upsert
   */
  export type CommentaryEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentaryEvent
     */
    select?: CommentaryEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentaryEvent
     */
    omit?: CommentaryEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryEventInclude<ExtArgs> | null
    /**
     * The filter to search for the CommentaryEvent to update in case it exists.
     */
    where: CommentaryEventWhereUniqueInput
    /**
     * In case the CommentaryEvent found by the `where` argument doesn't exist, create a new CommentaryEvent with this data.
     */
    create: XOR<CommentaryEventCreateInput, CommentaryEventUncheckedCreateInput>
    /**
     * In case the CommentaryEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentaryEventUpdateInput, CommentaryEventUncheckedUpdateInput>
  }

  /**
   * CommentaryEvent delete
   */
  export type CommentaryEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentaryEvent
     */
    select?: CommentaryEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentaryEvent
     */
    omit?: CommentaryEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryEventInclude<ExtArgs> | null
    /**
     * Filter which CommentaryEvent to delete.
     */
    where: CommentaryEventWhereUniqueInput
  }

  /**
   * CommentaryEvent deleteMany
   */
  export type CommentaryEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommentaryEvents to delete
     */
    where?: CommentaryEventWhereInput
    /**
     * Limit how many CommentaryEvents to delete.
     */
    limit?: number
  }

  /**
   * CommentaryEvent without action
   */
  export type CommentaryEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentaryEvent
     */
    select?: CommentaryEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentaryEvent
     */
    omit?: CommentaryEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentaryEventInclude<ExtArgs> | null
  }


  /**
   * Model SyncReport
   */

  export type AggregateSyncReport = {
    _count: SyncReportCountAggregateOutputType | null
    _avg: SyncReportAvgAggregateOutputType | null
    _sum: SyncReportSumAggregateOutputType | null
    _min: SyncReportMinAggregateOutputType | null
    _max: SyncReportMaxAggregateOutputType | null
  }

  export type SyncReportAvgAggregateOutputType = {
    reportedOffset: number | null
  }

  export type SyncReportSumAggregateOutputType = {
    reportedOffset: number | null
  }

  export type SyncReportMinAggregateOutputType = {
    id: string | null
    commentaryId: string | null
    userId: string | null
    reportedOffset: number | null
    userAgent: string | null
    streamPlatform: string | null
    createdAt: Date | null
  }

  export type SyncReportMaxAggregateOutputType = {
    id: string | null
    commentaryId: string | null
    userId: string | null
    reportedOffset: number | null
    userAgent: string | null
    streamPlatform: string | null
    createdAt: Date | null
  }

  export type SyncReportCountAggregateOutputType = {
    id: number
    commentaryId: number
    userId: number
    reportedOffset: number
    userAgent: number
    streamPlatform: number
    createdAt: number
    _all: number
  }


  export type SyncReportAvgAggregateInputType = {
    reportedOffset?: true
  }

  export type SyncReportSumAggregateInputType = {
    reportedOffset?: true
  }

  export type SyncReportMinAggregateInputType = {
    id?: true
    commentaryId?: true
    userId?: true
    reportedOffset?: true
    userAgent?: true
    streamPlatform?: true
    createdAt?: true
  }

  export type SyncReportMaxAggregateInputType = {
    id?: true
    commentaryId?: true
    userId?: true
    reportedOffset?: true
    userAgent?: true
    streamPlatform?: true
    createdAt?: true
  }

  export type SyncReportCountAggregateInputType = {
    id?: true
    commentaryId?: true
    userId?: true
    reportedOffset?: true
    userAgent?: true
    streamPlatform?: true
    createdAt?: true
    _all?: true
  }

  export type SyncReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncReport to aggregate.
     */
    where?: SyncReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncReports to fetch.
     */
    orderBy?: SyncReportOrderByWithRelationInput | SyncReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncReports
    **/
    _count?: true | SyncReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SyncReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SyncReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncReportMaxAggregateInputType
  }

  export type GetSyncReportAggregateType<T extends SyncReportAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncReport[P]>
      : GetScalarType<T[P], AggregateSyncReport[P]>
  }




  export type SyncReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncReportWhereInput
    orderBy?: SyncReportOrderByWithAggregationInput | SyncReportOrderByWithAggregationInput[]
    by: SyncReportScalarFieldEnum[] | SyncReportScalarFieldEnum
    having?: SyncReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncReportCountAggregateInputType | true
    _avg?: SyncReportAvgAggregateInputType
    _sum?: SyncReportSumAggregateInputType
    _min?: SyncReportMinAggregateInputType
    _max?: SyncReportMaxAggregateInputType
  }

  export type SyncReportGroupByOutputType = {
    id: string
    commentaryId: string
    userId: string | null
    reportedOffset: number
    userAgent: string | null
    streamPlatform: string | null
    createdAt: Date
    _count: SyncReportCountAggregateOutputType | null
    _avg: SyncReportAvgAggregateOutputType | null
    _sum: SyncReportSumAggregateOutputType | null
    _min: SyncReportMinAggregateOutputType | null
    _max: SyncReportMaxAggregateOutputType | null
  }

  type GetSyncReportGroupByPayload<T extends SyncReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncReportGroupByOutputType[P]>
            : GetScalarType<T[P], SyncReportGroupByOutputType[P]>
        }
      >
    >


  export type SyncReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentaryId?: boolean
    userId?: boolean
    reportedOffset?: boolean
    userAgent?: boolean
    streamPlatform?: boolean
    createdAt?: boolean
    commentary?: boolean | CommentaryDefaultArgs<ExtArgs>
    user?: boolean | SyncReport$userArgs<ExtArgs>
  }, ExtArgs["result"]["syncReport"]>

  export type SyncReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentaryId?: boolean
    userId?: boolean
    reportedOffset?: boolean
    userAgent?: boolean
    streamPlatform?: boolean
    createdAt?: boolean
    commentary?: boolean | CommentaryDefaultArgs<ExtArgs>
    user?: boolean | SyncReport$userArgs<ExtArgs>
  }, ExtArgs["result"]["syncReport"]>

  export type SyncReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentaryId?: boolean
    userId?: boolean
    reportedOffset?: boolean
    userAgent?: boolean
    streamPlatform?: boolean
    createdAt?: boolean
    commentary?: boolean | CommentaryDefaultArgs<ExtArgs>
    user?: boolean | SyncReport$userArgs<ExtArgs>
  }, ExtArgs["result"]["syncReport"]>

  export type SyncReportSelectScalar = {
    id?: boolean
    commentaryId?: boolean
    userId?: boolean
    reportedOffset?: boolean
    userAgent?: boolean
    streamPlatform?: boolean
    createdAt?: boolean
  }

  export type SyncReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "commentaryId" | "userId" | "reportedOffset" | "userAgent" | "streamPlatform" | "createdAt", ExtArgs["result"]["syncReport"]>
  export type SyncReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commentary?: boolean | CommentaryDefaultArgs<ExtArgs>
    user?: boolean | SyncReport$userArgs<ExtArgs>
  }
  export type SyncReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commentary?: boolean | CommentaryDefaultArgs<ExtArgs>
    user?: boolean | SyncReport$userArgs<ExtArgs>
  }
  export type SyncReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commentary?: boolean | CommentaryDefaultArgs<ExtArgs>
    user?: boolean | SyncReport$userArgs<ExtArgs>
  }

  export type $SyncReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncReport"
    objects: {
      commentary: Prisma.$CommentaryPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      commentaryId: string
      userId: string | null
      reportedOffset: number
      userAgent: string | null
      streamPlatform: string | null
      createdAt: Date
    }, ExtArgs["result"]["syncReport"]>
    composites: {}
  }

  type SyncReportGetPayload<S extends boolean | null | undefined | SyncReportDefaultArgs> = $Result.GetResult<Prisma.$SyncReportPayload, S>

  type SyncReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SyncReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SyncReportCountAggregateInputType | true
    }

  export interface SyncReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncReport'], meta: { name: 'SyncReport' } }
    /**
     * Find zero or one SyncReport that matches the filter.
     * @param {SyncReportFindUniqueArgs} args - Arguments to find a SyncReport
     * @example
     * // Get one SyncReport
     * const syncReport = await prisma.syncReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncReportFindUniqueArgs>(args: SelectSubset<T, SyncReportFindUniqueArgs<ExtArgs>>): Prisma__SyncReportClient<$Result.GetResult<Prisma.$SyncReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SyncReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SyncReportFindUniqueOrThrowArgs} args - Arguments to find a SyncReport
     * @example
     * // Get one SyncReport
     * const syncReport = await prisma.syncReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncReportFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncReportClient<$Result.GetResult<Prisma.$SyncReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncReportFindFirstArgs} args - Arguments to find a SyncReport
     * @example
     * // Get one SyncReport
     * const syncReport = await prisma.syncReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncReportFindFirstArgs>(args?: SelectSubset<T, SyncReportFindFirstArgs<ExtArgs>>): Prisma__SyncReportClient<$Result.GetResult<Prisma.$SyncReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncReportFindFirstOrThrowArgs} args - Arguments to find a SyncReport
     * @example
     * // Get one SyncReport
     * const syncReport = await prisma.syncReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncReportFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncReportClient<$Result.GetResult<Prisma.$SyncReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SyncReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncReports
     * const syncReports = await prisma.syncReport.findMany()
     * 
     * // Get first 10 SyncReports
     * const syncReports = await prisma.syncReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncReportWithIdOnly = await prisma.syncReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncReportFindManyArgs>(args?: SelectSubset<T, SyncReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SyncReport.
     * @param {SyncReportCreateArgs} args - Arguments to create a SyncReport.
     * @example
     * // Create one SyncReport
     * const SyncReport = await prisma.syncReport.create({
     *   data: {
     *     // ... data to create a SyncReport
     *   }
     * })
     * 
     */
    create<T extends SyncReportCreateArgs>(args: SelectSubset<T, SyncReportCreateArgs<ExtArgs>>): Prisma__SyncReportClient<$Result.GetResult<Prisma.$SyncReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SyncReports.
     * @param {SyncReportCreateManyArgs} args - Arguments to create many SyncReports.
     * @example
     * // Create many SyncReports
     * const syncReport = await prisma.syncReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncReportCreateManyArgs>(args?: SelectSubset<T, SyncReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncReports and returns the data saved in the database.
     * @param {SyncReportCreateManyAndReturnArgs} args - Arguments to create many SyncReports.
     * @example
     * // Create many SyncReports
     * const syncReport = await prisma.syncReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncReports and only return the `id`
     * const syncReportWithIdOnly = await prisma.syncReport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncReportCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SyncReport.
     * @param {SyncReportDeleteArgs} args - Arguments to delete one SyncReport.
     * @example
     * // Delete one SyncReport
     * const SyncReport = await prisma.syncReport.delete({
     *   where: {
     *     // ... filter to delete one SyncReport
     *   }
     * })
     * 
     */
    delete<T extends SyncReportDeleteArgs>(args: SelectSubset<T, SyncReportDeleteArgs<ExtArgs>>): Prisma__SyncReportClient<$Result.GetResult<Prisma.$SyncReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SyncReport.
     * @param {SyncReportUpdateArgs} args - Arguments to update one SyncReport.
     * @example
     * // Update one SyncReport
     * const syncReport = await prisma.syncReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncReportUpdateArgs>(args: SelectSubset<T, SyncReportUpdateArgs<ExtArgs>>): Prisma__SyncReportClient<$Result.GetResult<Prisma.$SyncReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SyncReports.
     * @param {SyncReportDeleteManyArgs} args - Arguments to filter SyncReports to delete.
     * @example
     * // Delete a few SyncReports
     * const { count } = await prisma.syncReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncReportDeleteManyArgs>(args?: SelectSubset<T, SyncReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncReports
     * const syncReport = await prisma.syncReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncReportUpdateManyArgs>(args: SelectSubset<T, SyncReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncReports and returns the data updated in the database.
     * @param {SyncReportUpdateManyAndReturnArgs} args - Arguments to update many SyncReports.
     * @example
     * // Update many SyncReports
     * const syncReport = await prisma.syncReport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SyncReports and only return the `id`
     * const syncReportWithIdOnly = await prisma.syncReport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SyncReportUpdateManyAndReturnArgs>(args: SelectSubset<T, SyncReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SyncReport.
     * @param {SyncReportUpsertArgs} args - Arguments to update or create a SyncReport.
     * @example
     * // Update or create a SyncReport
     * const syncReport = await prisma.syncReport.upsert({
     *   create: {
     *     // ... data to create a SyncReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncReport we want to update
     *   }
     * })
     */
    upsert<T extends SyncReportUpsertArgs>(args: SelectSubset<T, SyncReportUpsertArgs<ExtArgs>>): Prisma__SyncReportClient<$Result.GetResult<Prisma.$SyncReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SyncReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncReportCountArgs} args - Arguments to filter SyncReports to count.
     * @example
     * // Count the number of SyncReports
     * const count = await prisma.syncReport.count({
     *   where: {
     *     // ... the filter for the SyncReports we want to count
     *   }
     * })
    **/
    count<T extends SyncReportCountArgs>(
      args?: Subset<T, SyncReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncReportAggregateArgs>(args: Subset<T, SyncReportAggregateArgs>): Prisma.PrismaPromise<GetSyncReportAggregateType<T>>

    /**
     * Group by SyncReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncReportGroupByArgs['orderBy'] }
        : { orderBy?: SyncReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncReport model
   */
  readonly fields: SyncReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    commentary<T extends CommentaryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CommentaryDefaultArgs<ExtArgs>>): Prisma__CommentaryClient<$Result.GetResult<Prisma.$CommentaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends SyncReport$userArgs<ExtArgs> = {}>(args?: Subset<T, SyncReport$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncReport model
   */
  interface SyncReportFieldRefs {
    readonly id: FieldRef<"SyncReport", 'String'>
    readonly commentaryId: FieldRef<"SyncReport", 'String'>
    readonly userId: FieldRef<"SyncReport", 'String'>
    readonly reportedOffset: FieldRef<"SyncReport", 'Int'>
    readonly userAgent: FieldRef<"SyncReport", 'String'>
    readonly streamPlatform: FieldRef<"SyncReport", 'String'>
    readonly createdAt: FieldRef<"SyncReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SyncReport findUnique
   */
  export type SyncReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncReport
     */
    select?: SyncReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncReport
     */
    omit?: SyncReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncReportInclude<ExtArgs> | null
    /**
     * Filter, which SyncReport to fetch.
     */
    where: SyncReportWhereUniqueInput
  }

  /**
   * SyncReport findUniqueOrThrow
   */
  export type SyncReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncReport
     */
    select?: SyncReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncReport
     */
    omit?: SyncReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncReportInclude<ExtArgs> | null
    /**
     * Filter, which SyncReport to fetch.
     */
    where: SyncReportWhereUniqueInput
  }

  /**
   * SyncReport findFirst
   */
  export type SyncReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncReport
     */
    select?: SyncReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncReport
     */
    omit?: SyncReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncReportInclude<ExtArgs> | null
    /**
     * Filter, which SyncReport to fetch.
     */
    where?: SyncReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncReports to fetch.
     */
    orderBy?: SyncReportOrderByWithRelationInput | SyncReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncReports.
     */
    cursor?: SyncReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncReports.
     */
    distinct?: SyncReportScalarFieldEnum | SyncReportScalarFieldEnum[]
  }

  /**
   * SyncReport findFirstOrThrow
   */
  export type SyncReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncReport
     */
    select?: SyncReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncReport
     */
    omit?: SyncReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncReportInclude<ExtArgs> | null
    /**
     * Filter, which SyncReport to fetch.
     */
    where?: SyncReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncReports to fetch.
     */
    orderBy?: SyncReportOrderByWithRelationInput | SyncReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncReports.
     */
    cursor?: SyncReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncReports.
     */
    distinct?: SyncReportScalarFieldEnum | SyncReportScalarFieldEnum[]
  }

  /**
   * SyncReport findMany
   */
  export type SyncReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncReport
     */
    select?: SyncReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncReport
     */
    omit?: SyncReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncReportInclude<ExtArgs> | null
    /**
     * Filter, which SyncReports to fetch.
     */
    where?: SyncReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncReports to fetch.
     */
    orderBy?: SyncReportOrderByWithRelationInput | SyncReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncReports.
     */
    cursor?: SyncReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncReports.
     */
    skip?: number
    distinct?: SyncReportScalarFieldEnum | SyncReportScalarFieldEnum[]
  }

  /**
   * SyncReport create
   */
  export type SyncReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncReport
     */
    select?: SyncReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncReport
     */
    omit?: SyncReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncReportInclude<ExtArgs> | null
    /**
     * The data needed to create a SyncReport.
     */
    data: XOR<SyncReportCreateInput, SyncReportUncheckedCreateInput>
  }

  /**
   * SyncReport createMany
   */
  export type SyncReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncReports.
     */
    data: SyncReportCreateManyInput | SyncReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncReport createManyAndReturn
   */
  export type SyncReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncReport
     */
    select?: SyncReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncReport
     */
    omit?: SyncReportOmit<ExtArgs> | null
    /**
     * The data used to create many SyncReports.
     */
    data: SyncReportCreateManyInput | SyncReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SyncReport update
   */
  export type SyncReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncReport
     */
    select?: SyncReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncReport
     */
    omit?: SyncReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncReportInclude<ExtArgs> | null
    /**
     * The data needed to update a SyncReport.
     */
    data: XOR<SyncReportUpdateInput, SyncReportUncheckedUpdateInput>
    /**
     * Choose, which SyncReport to update.
     */
    where: SyncReportWhereUniqueInput
  }

  /**
   * SyncReport updateMany
   */
  export type SyncReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncReports.
     */
    data: XOR<SyncReportUpdateManyMutationInput, SyncReportUncheckedUpdateManyInput>
    /**
     * Filter which SyncReports to update
     */
    where?: SyncReportWhereInput
    /**
     * Limit how many SyncReports to update.
     */
    limit?: number
  }

  /**
   * SyncReport updateManyAndReturn
   */
  export type SyncReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncReport
     */
    select?: SyncReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncReport
     */
    omit?: SyncReportOmit<ExtArgs> | null
    /**
     * The data used to update SyncReports.
     */
    data: XOR<SyncReportUpdateManyMutationInput, SyncReportUncheckedUpdateManyInput>
    /**
     * Filter which SyncReports to update
     */
    where?: SyncReportWhereInput
    /**
     * Limit how many SyncReports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SyncReport upsert
   */
  export type SyncReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncReport
     */
    select?: SyncReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncReport
     */
    omit?: SyncReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncReportInclude<ExtArgs> | null
    /**
     * The filter to search for the SyncReport to update in case it exists.
     */
    where: SyncReportWhereUniqueInput
    /**
     * In case the SyncReport found by the `where` argument doesn't exist, create a new SyncReport with this data.
     */
    create: XOR<SyncReportCreateInput, SyncReportUncheckedCreateInput>
    /**
     * In case the SyncReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncReportUpdateInput, SyncReportUncheckedUpdateInput>
  }

  /**
   * SyncReport delete
   */
  export type SyncReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncReport
     */
    select?: SyncReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncReport
     */
    omit?: SyncReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncReportInclude<ExtArgs> | null
    /**
     * Filter which SyncReport to delete.
     */
    where: SyncReportWhereUniqueInput
  }

  /**
   * SyncReport deleteMany
   */
  export type SyncReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncReports to delete
     */
    where?: SyncReportWhereInput
    /**
     * Limit how many SyncReports to delete.
     */
    limit?: number
  }

  /**
   * SyncReport.user
   */
  export type SyncReport$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * SyncReport without action
   */
  export type SyncReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncReport
     */
    select?: SyncReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncReport
     */
    omit?: SyncReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncReportInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    isCommentator: 'isCommentator',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MatchScalarFieldEnum: {
    id: 'id',
    league: 'league',
    homeTeam: 'homeTeam',
    awayTeam: 'awayTeam',
    scheduledTime: 'scheduledTime',
    streamUrlPatterns: 'streamUrlPatterns',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MatchScalarFieldEnum = (typeof MatchScalarFieldEnum)[keyof typeof MatchScalarFieldEnum]


  export const CommentaryScalarFieldEnum: {
    id: 'id',
    matchId: 'matchId',
    commentatorId: 'commentatorId',
    title: 'title',
    description: 'description',
    audioUrl: 'audioUrl',
    duration: 'duration',
    youtubeStreamUrl: 'youtubeStreamUrl',
    youtubeStreamId: 'youtubeStreamId',
    status: 'status',
    language: 'language',
    baselineOffset: 'baselineOffset',
    avgLatency: 'avgLatency',
    viewCount: 'viewCount',
    rating: 'rating',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CommentaryScalarFieldEnum = (typeof CommentaryScalarFieldEnum)[keyof typeof CommentaryScalarFieldEnum]


  export const MatchEventScalarFieldEnum: {
    id: 'id',
    matchId: 'matchId',
    type: 'type',
    team: 'team',
    player: 'player',
    minute: 'minute',
    timestamp: 'timestamp',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type MatchEventScalarFieldEnum = (typeof MatchEventScalarFieldEnum)[keyof typeof MatchEventScalarFieldEnum]


  export const CommentaryEventScalarFieldEnum: {
    id: 'id',
    commentaryId: 'commentaryId',
    type: 'type',
    gameMinute: 'gameMinute',
    audioTimestamp: 'audioTimestamp',
    timestamp: 'timestamp',
    createdAt: 'createdAt'
  };

  export type CommentaryEventScalarFieldEnum = (typeof CommentaryEventScalarFieldEnum)[keyof typeof CommentaryEventScalarFieldEnum]


  export const SyncReportScalarFieldEnum: {
    id: 'id',
    commentaryId: 'commentaryId',
    userId: 'userId',
    reportedOffset: 'reportedOffset',
    userAgent: 'userAgent',
    streamPlatform: 'streamPlatform',
    createdAt: 'createdAt'
  };

  export type SyncReportScalarFieldEnum = (typeof SyncReportScalarFieldEnum)[keyof typeof SyncReportScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    isCommentator?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    commentaries?: CommentaryListRelationFilter
    syncReports?: SyncReportListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    isCommentator?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    commentaries?: CommentaryOrderByRelationAggregateInput
    syncReports?: SyncReportOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    isCommentator?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    commentaries?: CommentaryListRelationFilter
    syncReports?: SyncReportListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    isCommentator?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    isCommentator?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MatchWhereInput = {
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    id?: StringFilter<"Match"> | string
    league?: StringFilter<"Match"> | string
    homeTeam?: StringFilter<"Match"> | string
    awayTeam?: StringFilter<"Match"> | string
    scheduledTime?: DateTimeFilter<"Match"> | Date | string
    streamUrlPatterns?: StringNullableListFilter<"Match">
    status?: StringFilter<"Match"> | string
    createdAt?: DateTimeFilter<"Match"> | Date | string
    updatedAt?: DateTimeFilter<"Match"> | Date | string
    commentaries?: CommentaryListRelationFilter
    events?: MatchEventListRelationFilter
  }

  export type MatchOrderByWithRelationInput = {
    id?: SortOrder
    league?: SortOrder
    homeTeam?: SortOrder
    awayTeam?: SortOrder
    scheduledTime?: SortOrder
    streamUrlPatterns?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    commentaries?: CommentaryOrderByRelationAggregateInput
    events?: MatchEventOrderByRelationAggregateInput
  }

  export type MatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    league?: StringFilter<"Match"> | string
    homeTeam?: StringFilter<"Match"> | string
    awayTeam?: StringFilter<"Match"> | string
    scheduledTime?: DateTimeFilter<"Match"> | Date | string
    streamUrlPatterns?: StringNullableListFilter<"Match">
    status?: StringFilter<"Match"> | string
    createdAt?: DateTimeFilter<"Match"> | Date | string
    updatedAt?: DateTimeFilter<"Match"> | Date | string
    commentaries?: CommentaryListRelationFilter
    events?: MatchEventListRelationFilter
  }, "id">

  export type MatchOrderByWithAggregationInput = {
    id?: SortOrder
    league?: SortOrder
    homeTeam?: SortOrder
    awayTeam?: SortOrder
    scheduledTime?: SortOrder
    streamUrlPatterns?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MatchCountOrderByAggregateInput
    _max?: MatchMaxOrderByAggregateInput
    _min?: MatchMinOrderByAggregateInput
  }

  export type MatchScalarWhereWithAggregatesInput = {
    AND?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    OR?: MatchScalarWhereWithAggregatesInput[]
    NOT?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Match"> | string
    league?: StringWithAggregatesFilter<"Match"> | string
    homeTeam?: StringWithAggregatesFilter<"Match"> | string
    awayTeam?: StringWithAggregatesFilter<"Match"> | string
    scheduledTime?: DateTimeWithAggregatesFilter<"Match"> | Date | string
    streamUrlPatterns?: StringNullableListFilter<"Match">
    status?: StringWithAggregatesFilter<"Match"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Match"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Match"> | Date | string
  }

  export type CommentaryWhereInput = {
    AND?: CommentaryWhereInput | CommentaryWhereInput[]
    OR?: CommentaryWhereInput[]
    NOT?: CommentaryWhereInput | CommentaryWhereInput[]
    id?: StringFilter<"Commentary"> | string
    matchId?: StringFilter<"Commentary"> | string
    commentatorId?: StringFilter<"Commentary"> | string
    title?: StringFilter<"Commentary"> | string
    description?: StringNullableFilter<"Commentary"> | string | null
    audioUrl?: StringNullableFilter<"Commentary"> | string | null
    duration?: IntFilter<"Commentary"> | number
    youtubeStreamUrl?: StringNullableFilter<"Commentary"> | string | null
    youtubeStreamId?: StringNullableFilter<"Commentary"> | string | null
    status?: StringFilter<"Commentary"> | string
    language?: StringFilter<"Commentary"> | string
    baselineOffset?: IntFilter<"Commentary"> | number
    avgLatency?: IntFilter<"Commentary"> | number
    viewCount?: IntFilter<"Commentary"> | number
    rating?: FloatFilter<"Commentary"> | number
    startedAt?: DateTimeNullableFilter<"Commentary"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"Commentary"> | Date | string | null
    createdAt?: DateTimeFilter<"Commentary"> | Date | string
    updatedAt?: DateTimeFilter<"Commentary"> | Date | string
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
    commentator?: XOR<UserScalarRelationFilter, UserWhereInput>
    events?: CommentaryEventListRelationFilter
    syncReports?: SyncReportListRelationFilter
  }

  export type CommentaryOrderByWithRelationInput = {
    id?: SortOrder
    matchId?: SortOrder
    commentatorId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    audioUrl?: SortOrderInput | SortOrder
    duration?: SortOrder
    youtubeStreamUrl?: SortOrderInput | SortOrder
    youtubeStreamId?: SortOrderInput | SortOrder
    status?: SortOrder
    language?: SortOrder
    baselineOffset?: SortOrder
    avgLatency?: SortOrder
    viewCount?: SortOrder
    rating?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    match?: MatchOrderByWithRelationInput
    commentator?: UserOrderByWithRelationInput
    events?: CommentaryEventOrderByRelationAggregateInput
    syncReports?: SyncReportOrderByRelationAggregateInput
  }

  export type CommentaryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommentaryWhereInput | CommentaryWhereInput[]
    OR?: CommentaryWhereInput[]
    NOT?: CommentaryWhereInput | CommentaryWhereInput[]
    matchId?: StringFilter<"Commentary"> | string
    commentatorId?: StringFilter<"Commentary"> | string
    title?: StringFilter<"Commentary"> | string
    description?: StringNullableFilter<"Commentary"> | string | null
    audioUrl?: StringNullableFilter<"Commentary"> | string | null
    duration?: IntFilter<"Commentary"> | number
    youtubeStreamUrl?: StringNullableFilter<"Commentary"> | string | null
    youtubeStreamId?: StringNullableFilter<"Commentary"> | string | null
    status?: StringFilter<"Commentary"> | string
    language?: StringFilter<"Commentary"> | string
    baselineOffset?: IntFilter<"Commentary"> | number
    avgLatency?: IntFilter<"Commentary"> | number
    viewCount?: IntFilter<"Commentary"> | number
    rating?: FloatFilter<"Commentary"> | number
    startedAt?: DateTimeNullableFilter<"Commentary"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"Commentary"> | Date | string | null
    createdAt?: DateTimeFilter<"Commentary"> | Date | string
    updatedAt?: DateTimeFilter<"Commentary"> | Date | string
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
    commentator?: XOR<UserScalarRelationFilter, UserWhereInput>
    events?: CommentaryEventListRelationFilter
    syncReports?: SyncReportListRelationFilter
  }, "id">

  export type CommentaryOrderByWithAggregationInput = {
    id?: SortOrder
    matchId?: SortOrder
    commentatorId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    audioUrl?: SortOrderInput | SortOrder
    duration?: SortOrder
    youtubeStreamUrl?: SortOrderInput | SortOrder
    youtubeStreamId?: SortOrderInput | SortOrder
    status?: SortOrder
    language?: SortOrder
    baselineOffset?: SortOrder
    avgLatency?: SortOrder
    viewCount?: SortOrder
    rating?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CommentaryCountOrderByAggregateInput
    _avg?: CommentaryAvgOrderByAggregateInput
    _max?: CommentaryMaxOrderByAggregateInput
    _min?: CommentaryMinOrderByAggregateInput
    _sum?: CommentarySumOrderByAggregateInput
  }

  export type CommentaryScalarWhereWithAggregatesInput = {
    AND?: CommentaryScalarWhereWithAggregatesInput | CommentaryScalarWhereWithAggregatesInput[]
    OR?: CommentaryScalarWhereWithAggregatesInput[]
    NOT?: CommentaryScalarWhereWithAggregatesInput | CommentaryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Commentary"> | string
    matchId?: StringWithAggregatesFilter<"Commentary"> | string
    commentatorId?: StringWithAggregatesFilter<"Commentary"> | string
    title?: StringWithAggregatesFilter<"Commentary"> | string
    description?: StringNullableWithAggregatesFilter<"Commentary"> | string | null
    audioUrl?: StringNullableWithAggregatesFilter<"Commentary"> | string | null
    duration?: IntWithAggregatesFilter<"Commentary"> | number
    youtubeStreamUrl?: StringNullableWithAggregatesFilter<"Commentary"> | string | null
    youtubeStreamId?: StringNullableWithAggregatesFilter<"Commentary"> | string | null
    status?: StringWithAggregatesFilter<"Commentary"> | string
    language?: StringWithAggregatesFilter<"Commentary"> | string
    baselineOffset?: IntWithAggregatesFilter<"Commentary"> | number
    avgLatency?: IntWithAggregatesFilter<"Commentary"> | number
    viewCount?: IntWithAggregatesFilter<"Commentary"> | number
    rating?: FloatWithAggregatesFilter<"Commentary"> | number
    startedAt?: DateTimeNullableWithAggregatesFilter<"Commentary"> | Date | string | null
    endedAt?: DateTimeNullableWithAggregatesFilter<"Commentary"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Commentary"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Commentary"> | Date | string
  }

  export type MatchEventWhereInput = {
    AND?: MatchEventWhereInput | MatchEventWhereInput[]
    OR?: MatchEventWhereInput[]
    NOT?: MatchEventWhereInput | MatchEventWhereInput[]
    id?: StringFilter<"MatchEvent"> | string
    matchId?: StringFilter<"MatchEvent"> | string
    type?: StringFilter<"MatchEvent"> | string
    team?: StringNullableFilter<"MatchEvent"> | string | null
    player?: StringNullableFilter<"MatchEvent"> | string | null
    minute?: IntFilter<"MatchEvent"> | number
    timestamp?: DateTimeFilter<"MatchEvent"> | Date | string
    description?: StringNullableFilter<"MatchEvent"> | string | null
    createdAt?: DateTimeFilter<"MatchEvent"> | Date | string
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
  }

  export type MatchEventOrderByWithRelationInput = {
    id?: SortOrder
    matchId?: SortOrder
    type?: SortOrder
    team?: SortOrderInput | SortOrder
    player?: SortOrderInput | SortOrder
    minute?: SortOrder
    timestamp?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    match?: MatchOrderByWithRelationInput
  }

  export type MatchEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MatchEventWhereInput | MatchEventWhereInput[]
    OR?: MatchEventWhereInput[]
    NOT?: MatchEventWhereInput | MatchEventWhereInput[]
    matchId?: StringFilter<"MatchEvent"> | string
    type?: StringFilter<"MatchEvent"> | string
    team?: StringNullableFilter<"MatchEvent"> | string | null
    player?: StringNullableFilter<"MatchEvent"> | string | null
    minute?: IntFilter<"MatchEvent"> | number
    timestamp?: DateTimeFilter<"MatchEvent"> | Date | string
    description?: StringNullableFilter<"MatchEvent"> | string | null
    createdAt?: DateTimeFilter<"MatchEvent"> | Date | string
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
  }, "id">

  export type MatchEventOrderByWithAggregationInput = {
    id?: SortOrder
    matchId?: SortOrder
    type?: SortOrder
    team?: SortOrderInput | SortOrder
    player?: SortOrderInput | SortOrder
    minute?: SortOrder
    timestamp?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MatchEventCountOrderByAggregateInput
    _avg?: MatchEventAvgOrderByAggregateInput
    _max?: MatchEventMaxOrderByAggregateInput
    _min?: MatchEventMinOrderByAggregateInput
    _sum?: MatchEventSumOrderByAggregateInput
  }

  export type MatchEventScalarWhereWithAggregatesInput = {
    AND?: MatchEventScalarWhereWithAggregatesInput | MatchEventScalarWhereWithAggregatesInput[]
    OR?: MatchEventScalarWhereWithAggregatesInput[]
    NOT?: MatchEventScalarWhereWithAggregatesInput | MatchEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MatchEvent"> | string
    matchId?: StringWithAggregatesFilter<"MatchEvent"> | string
    type?: StringWithAggregatesFilter<"MatchEvent"> | string
    team?: StringNullableWithAggregatesFilter<"MatchEvent"> | string | null
    player?: StringNullableWithAggregatesFilter<"MatchEvent"> | string | null
    minute?: IntWithAggregatesFilter<"MatchEvent"> | number
    timestamp?: DateTimeWithAggregatesFilter<"MatchEvent"> | Date | string
    description?: StringNullableWithAggregatesFilter<"MatchEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MatchEvent"> | Date | string
  }

  export type CommentaryEventWhereInput = {
    AND?: CommentaryEventWhereInput | CommentaryEventWhereInput[]
    OR?: CommentaryEventWhereInput[]
    NOT?: CommentaryEventWhereInput | CommentaryEventWhereInput[]
    id?: StringFilter<"CommentaryEvent"> | string
    commentaryId?: StringFilter<"CommentaryEvent"> | string
    type?: StringFilter<"CommentaryEvent"> | string
    gameMinute?: IntFilter<"CommentaryEvent"> | number
    audioTimestamp?: IntFilter<"CommentaryEvent"> | number
    timestamp?: DateTimeFilter<"CommentaryEvent"> | Date | string
    createdAt?: DateTimeFilter<"CommentaryEvent"> | Date | string
    commentary?: XOR<CommentaryScalarRelationFilter, CommentaryWhereInput>
  }

  export type CommentaryEventOrderByWithRelationInput = {
    id?: SortOrder
    commentaryId?: SortOrder
    type?: SortOrder
    gameMinute?: SortOrder
    audioTimestamp?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    commentary?: CommentaryOrderByWithRelationInput
  }

  export type CommentaryEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommentaryEventWhereInput | CommentaryEventWhereInput[]
    OR?: CommentaryEventWhereInput[]
    NOT?: CommentaryEventWhereInput | CommentaryEventWhereInput[]
    commentaryId?: StringFilter<"CommentaryEvent"> | string
    type?: StringFilter<"CommentaryEvent"> | string
    gameMinute?: IntFilter<"CommentaryEvent"> | number
    audioTimestamp?: IntFilter<"CommentaryEvent"> | number
    timestamp?: DateTimeFilter<"CommentaryEvent"> | Date | string
    createdAt?: DateTimeFilter<"CommentaryEvent"> | Date | string
    commentary?: XOR<CommentaryScalarRelationFilter, CommentaryWhereInput>
  }, "id">

  export type CommentaryEventOrderByWithAggregationInput = {
    id?: SortOrder
    commentaryId?: SortOrder
    type?: SortOrder
    gameMinute?: SortOrder
    audioTimestamp?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    _count?: CommentaryEventCountOrderByAggregateInput
    _avg?: CommentaryEventAvgOrderByAggregateInput
    _max?: CommentaryEventMaxOrderByAggregateInput
    _min?: CommentaryEventMinOrderByAggregateInput
    _sum?: CommentaryEventSumOrderByAggregateInput
  }

  export type CommentaryEventScalarWhereWithAggregatesInput = {
    AND?: CommentaryEventScalarWhereWithAggregatesInput | CommentaryEventScalarWhereWithAggregatesInput[]
    OR?: CommentaryEventScalarWhereWithAggregatesInput[]
    NOT?: CommentaryEventScalarWhereWithAggregatesInput | CommentaryEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CommentaryEvent"> | string
    commentaryId?: StringWithAggregatesFilter<"CommentaryEvent"> | string
    type?: StringWithAggregatesFilter<"CommentaryEvent"> | string
    gameMinute?: IntWithAggregatesFilter<"CommentaryEvent"> | number
    audioTimestamp?: IntWithAggregatesFilter<"CommentaryEvent"> | number
    timestamp?: DateTimeWithAggregatesFilter<"CommentaryEvent"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"CommentaryEvent"> | Date | string
  }

  export type SyncReportWhereInput = {
    AND?: SyncReportWhereInput | SyncReportWhereInput[]
    OR?: SyncReportWhereInput[]
    NOT?: SyncReportWhereInput | SyncReportWhereInput[]
    id?: StringFilter<"SyncReport"> | string
    commentaryId?: StringFilter<"SyncReport"> | string
    userId?: StringNullableFilter<"SyncReport"> | string | null
    reportedOffset?: IntFilter<"SyncReport"> | number
    userAgent?: StringNullableFilter<"SyncReport"> | string | null
    streamPlatform?: StringNullableFilter<"SyncReport"> | string | null
    createdAt?: DateTimeFilter<"SyncReport"> | Date | string
    commentary?: XOR<CommentaryScalarRelationFilter, CommentaryWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type SyncReportOrderByWithRelationInput = {
    id?: SortOrder
    commentaryId?: SortOrder
    userId?: SortOrderInput | SortOrder
    reportedOffset?: SortOrder
    userAgent?: SortOrderInput | SortOrder
    streamPlatform?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    commentary?: CommentaryOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type SyncReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SyncReportWhereInput | SyncReportWhereInput[]
    OR?: SyncReportWhereInput[]
    NOT?: SyncReportWhereInput | SyncReportWhereInput[]
    commentaryId?: StringFilter<"SyncReport"> | string
    userId?: StringNullableFilter<"SyncReport"> | string | null
    reportedOffset?: IntFilter<"SyncReport"> | number
    userAgent?: StringNullableFilter<"SyncReport"> | string | null
    streamPlatform?: StringNullableFilter<"SyncReport"> | string | null
    createdAt?: DateTimeFilter<"SyncReport"> | Date | string
    commentary?: XOR<CommentaryScalarRelationFilter, CommentaryWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type SyncReportOrderByWithAggregationInput = {
    id?: SortOrder
    commentaryId?: SortOrder
    userId?: SortOrderInput | SortOrder
    reportedOffset?: SortOrder
    userAgent?: SortOrderInput | SortOrder
    streamPlatform?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SyncReportCountOrderByAggregateInput
    _avg?: SyncReportAvgOrderByAggregateInput
    _max?: SyncReportMaxOrderByAggregateInput
    _min?: SyncReportMinOrderByAggregateInput
    _sum?: SyncReportSumOrderByAggregateInput
  }

  export type SyncReportScalarWhereWithAggregatesInput = {
    AND?: SyncReportScalarWhereWithAggregatesInput | SyncReportScalarWhereWithAggregatesInput[]
    OR?: SyncReportScalarWhereWithAggregatesInput[]
    NOT?: SyncReportScalarWhereWithAggregatesInput | SyncReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SyncReport"> | string
    commentaryId?: StringWithAggregatesFilter<"SyncReport"> | string
    userId?: StringNullableWithAggregatesFilter<"SyncReport"> | string | null
    reportedOffset?: IntWithAggregatesFilter<"SyncReport"> | number
    userAgent?: StringNullableWithAggregatesFilter<"SyncReport"> | string | null
    streamPlatform?: StringNullableWithAggregatesFilter<"SyncReport"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SyncReport"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    isCommentator?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    commentaries?: CommentaryCreateNestedManyWithoutCommentatorInput
    syncReports?: SyncReportCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    isCommentator?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    commentaries?: CommentaryUncheckedCreateNestedManyWithoutCommentatorInput
    syncReports?: SyncReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isCommentator?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commentaries?: CommentaryUpdateManyWithoutCommentatorNestedInput
    syncReports?: SyncReportUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isCommentator?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commentaries?: CommentaryUncheckedUpdateManyWithoutCommentatorNestedInput
    syncReports?: SyncReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    isCommentator?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isCommentator?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isCommentator?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchCreateInput = {
    id?: string
    league: string
    homeTeam: string
    awayTeam: string
    scheduledTime: Date | string
    streamUrlPatterns?: MatchCreatestreamUrlPatternsInput | string[]
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    commentaries?: CommentaryCreateNestedManyWithoutMatchInput
    events?: MatchEventCreateNestedManyWithoutMatchInput
  }

  export type MatchUncheckedCreateInput = {
    id?: string
    league: string
    homeTeam: string
    awayTeam: string
    scheduledTime: Date | string
    streamUrlPatterns?: MatchCreatestreamUrlPatternsInput | string[]
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    commentaries?: CommentaryUncheckedCreateNestedManyWithoutMatchInput
    events?: MatchEventUncheckedCreateNestedManyWithoutMatchInput
  }

  export type MatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    league?: StringFieldUpdateOperationsInput | string
    homeTeam?: StringFieldUpdateOperationsInput | string
    awayTeam?: StringFieldUpdateOperationsInput | string
    scheduledTime?: DateTimeFieldUpdateOperationsInput | Date | string
    streamUrlPatterns?: MatchUpdatestreamUrlPatternsInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commentaries?: CommentaryUpdateManyWithoutMatchNestedInput
    events?: MatchEventUpdateManyWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    league?: StringFieldUpdateOperationsInput | string
    homeTeam?: StringFieldUpdateOperationsInput | string
    awayTeam?: StringFieldUpdateOperationsInput | string
    scheduledTime?: DateTimeFieldUpdateOperationsInput | Date | string
    streamUrlPatterns?: MatchUpdatestreamUrlPatternsInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commentaries?: CommentaryUncheckedUpdateManyWithoutMatchNestedInput
    events?: MatchEventUncheckedUpdateManyWithoutMatchNestedInput
  }

  export type MatchCreateManyInput = {
    id?: string
    league: string
    homeTeam: string
    awayTeam: string
    scheduledTime: Date | string
    streamUrlPatterns?: MatchCreatestreamUrlPatternsInput | string[]
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    league?: StringFieldUpdateOperationsInput | string
    homeTeam?: StringFieldUpdateOperationsInput | string
    awayTeam?: StringFieldUpdateOperationsInput | string
    scheduledTime?: DateTimeFieldUpdateOperationsInput | Date | string
    streamUrlPatterns?: MatchUpdatestreamUrlPatternsInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    league?: StringFieldUpdateOperationsInput | string
    homeTeam?: StringFieldUpdateOperationsInput | string
    awayTeam?: StringFieldUpdateOperationsInput | string
    scheduledTime?: DateTimeFieldUpdateOperationsInput | Date | string
    streamUrlPatterns?: MatchUpdatestreamUrlPatternsInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentaryCreateInput = {
    id?: string
    title: string
    description?: string | null
    audioUrl?: string | null
    duration?: number
    youtubeStreamUrl?: string | null
    youtubeStreamId?: string | null
    status?: string
    language?: string
    baselineOffset?: number
    avgLatency?: number
    viewCount?: number
    rating?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    match: MatchCreateNestedOneWithoutCommentariesInput
    commentator: UserCreateNestedOneWithoutCommentariesInput
    events?: CommentaryEventCreateNestedManyWithoutCommentaryInput
    syncReports?: SyncReportCreateNestedManyWithoutCommentaryInput
  }

  export type CommentaryUncheckedCreateInput = {
    id?: string
    matchId: string
    commentatorId: string
    title: string
    description?: string | null
    audioUrl?: string | null
    duration?: number
    youtubeStreamUrl?: string | null
    youtubeStreamId?: string | null
    status?: string
    language?: string
    baselineOffset?: number
    avgLatency?: number
    viewCount?: number
    rating?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: CommentaryEventUncheckedCreateNestedManyWithoutCommentaryInput
    syncReports?: SyncReportUncheckedCreateNestedManyWithoutCommentaryInput
  }

  export type CommentaryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: IntFieldUpdateOperationsInput | number
    youtubeStreamUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    baselineOffset?: IntFieldUpdateOperationsInput | number
    avgLatency?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutCommentariesNestedInput
    commentator?: UserUpdateOneRequiredWithoutCommentariesNestedInput
    events?: CommentaryEventUpdateManyWithoutCommentaryNestedInput
    syncReports?: SyncReportUpdateManyWithoutCommentaryNestedInput
  }

  export type CommentaryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    commentatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: IntFieldUpdateOperationsInput | number
    youtubeStreamUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    baselineOffset?: IntFieldUpdateOperationsInput | number
    avgLatency?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: CommentaryEventUncheckedUpdateManyWithoutCommentaryNestedInput
    syncReports?: SyncReportUncheckedUpdateManyWithoutCommentaryNestedInput
  }

  export type CommentaryCreateManyInput = {
    id?: string
    matchId: string
    commentatorId: string
    title: string
    description?: string | null
    audioUrl?: string | null
    duration?: number
    youtubeStreamUrl?: string | null
    youtubeStreamId?: string | null
    status?: string
    language?: string
    baselineOffset?: number
    avgLatency?: number
    viewCount?: number
    rating?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentaryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: IntFieldUpdateOperationsInput | number
    youtubeStreamUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    baselineOffset?: IntFieldUpdateOperationsInput | number
    avgLatency?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentaryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    commentatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: IntFieldUpdateOperationsInput | number
    youtubeStreamUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    baselineOffset?: IntFieldUpdateOperationsInput | number
    avgLatency?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchEventCreateInput = {
    id?: string
    type: string
    team?: string | null
    player?: string | null
    minute: number
    timestamp: Date | string
    description?: string | null
    createdAt?: Date | string
    match: MatchCreateNestedOneWithoutEventsInput
  }

  export type MatchEventUncheckedCreateInput = {
    id?: string
    matchId: string
    type: string
    team?: string | null
    player?: string | null
    minute: number
    timestamp: Date | string
    description?: string | null
    createdAt?: Date | string
  }

  export type MatchEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    team?: NullableStringFieldUpdateOperationsInput | string | null
    player?: NullableStringFieldUpdateOperationsInput | string | null
    minute?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutEventsNestedInput
  }

  export type MatchEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    team?: NullableStringFieldUpdateOperationsInput | string | null
    player?: NullableStringFieldUpdateOperationsInput | string | null
    minute?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchEventCreateManyInput = {
    id?: string
    matchId: string
    type: string
    team?: string | null
    player?: string | null
    minute: number
    timestamp: Date | string
    description?: string | null
    createdAt?: Date | string
  }

  export type MatchEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    team?: NullableStringFieldUpdateOperationsInput | string | null
    player?: NullableStringFieldUpdateOperationsInput | string | null
    minute?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    team?: NullableStringFieldUpdateOperationsInput | string | null
    player?: NullableStringFieldUpdateOperationsInput | string | null
    minute?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentaryEventCreateInput = {
    id?: string
    type: string
    gameMinute: number
    audioTimestamp: number
    timestamp: Date | string
    createdAt?: Date | string
    commentary: CommentaryCreateNestedOneWithoutEventsInput
  }

  export type CommentaryEventUncheckedCreateInput = {
    id?: string
    commentaryId: string
    type: string
    gameMinute: number
    audioTimestamp: number
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type CommentaryEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    gameMinute?: IntFieldUpdateOperationsInput | number
    audioTimestamp?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commentary?: CommentaryUpdateOneRequiredWithoutEventsNestedInput
  }

  export type CommentaryEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentaryId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    gameMinute?: IntFieldUpdateOperationsInput | number
    audioTimestamp?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentaryEventCreateManyInput = {
    id?: string
    commentaryId: string
    type: string
    gameMinute: number
    audioTimestamp: number
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type CommentaryEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    gameMinute?: IntFieldUpdateOperationsInput | number
    audioTimestamp?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentaryEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentaryId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    gameMinute?: IntFieldUpdateOperationsInput | number
    audioTimestamp?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncReportCreateInput = {
    id?: string
    reportedOffset: number
    userAgent?: string | null
    streamPlatform?: string | null
    createdAt?: Date | string
    commentary: CommentaryCreateNestedOneWithoutSyncReportsInput
    user?: UserCreateNestedOneWithoutSyncReportsInput
  }

  export type SyncReportUncheckedCreateInput = {
    id?: string
    commentaryId: string
    userId?: string | null
    reportedOffset: number
    userAgent?: string | null
    streamPlatform?: string | null
    createdAt?: Date | string
  }

  export type SyncReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportedOffset?: IntFieldUpdateOperationsInput | number
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    streamPlatform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commentary?: CommentaryUpdateOneRequiredWithoutSyncReportsNestedInput
    user?: UserUpdateOneWithoutSyncReportsNestedInput
  }

  export type SyncReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentaryId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    reportedOffset?: IntFieldUpdateOperationsInput | number
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    streamPlatform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncReportCreateManyInput = {
    id?: string
    commentaryId: string
    userId?: string | null
    reportedOffset: number
    userAgent?: string | null
    streamPlatform?: string | null
    createdAt?: Date | string
  }

  export type SyncReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportedOffset?: IntFieldUpdateOperationsInput | number
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    streamPlatform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentaryId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    reportedOffset?: IntFieldUpdateOperationsInput | number
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    streamPlatform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CommentaryListRelationFilter = {
    every?: CommentaryWhereInput
    some?: CommentaryWhereInput
    none?: CommentaryWhereInput
  }

  export type SyncReportListRelationFilter = {
    every?: SyncReportWhereInput
    some?: SyncReportWhereInput
    none?: SyncReportWhereInput
  }

  export type CommentaryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SyncReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    isCommentator?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    isCommentator?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    isCommentator?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type MatchEventListRelationFilter = {
    every?: MatchEventWhereInput
    some?: MatchEventWhereInput
    none?: MatchEventWhereInput
  }

  export type MatchEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MatchCountOrderByAggregateInput = {
    id?: SortOrder
    league?: SortOrder
    homeTeam?: SortOrder
    awayTeam?: SortOrder
    scheduledTime?: SortOrder
    streamUrlPatterns?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MatchMaxOrderByAggregateInput = {
    id?: SortOrder
    league?: SortOrder
    homeTeam?: SortOrder
    awayTeam?: SortOrder
    scheduledTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MatchMinOrderByAggregateInput = {
    id?: SortOrder
    league?: SortOrder
    homeTeam?: SortOrder
    awayTeam?: SortOrder
    scheduledTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type MatchScalarRelationFilter = {
    is?: MatchWhereInput
    isNot?: MatchWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CommentaryEventListRelationFilter = {
    every?: CommentaryEventWhereInput
    some?: CommentaryEventWhereInput
    none?: CommentaryEventWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CommentaryEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentaryCountOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    commentatorId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    audioUrl?: SortOrder
    duration?: SortOrder
    youtubeStreamUrl?: SortOrder
    youtubeStreamId?: SortOrder
    status?: SortOrder
    language?: SortOrder
    baselineOffset?: SortOrder
    avgLatency?: SortOrder
    viewCount?: SortOrder
    rating?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentaryAvgOrderByAggregateInput = {
    duration?: SortOrder
    baselineOffset?: SortOrder
    avgLatency?: SortOrder
    viewCount?: SortOrder
    rating?: SortOrder
  }

  export type CommentaryMaxOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    commentatorId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    audioUrl?: SortOrder
    duration?: SortOrder
    youtubeStreamUrl?: SortOrder
    youtubeStreamId?: SortOrder
    status?: SortOrder
    language?: SortOrder
    baselineOffset?: SortOrder
    avgLatency?: SortOrder
    viewCount?: SortOrder
    rating?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentaryMinOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    commentatorId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    audioUrl?: SortOrder
    duration?: SortOrder
    youtubeStreamUrl?: SortOrder
    youtubeStreamId?: SortOrder
    status?: SortOrder
    language?: SortOrder
    baselineOffset?: SortOrder
    avgLatency?: SortOrder
    viewCount?: SortOrder
    rating?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentarySumOrderByAggregateInput = {
    duration?: SortOrder
    baselineOffset?: SortOrder
    avgLatency?: SortOrder
    viewCount?: SortOrder
    rating?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type MatchEventCountOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    type?: SortOrder
    team?: SortOrder
    player?: SortOrder
    minute?: SortOrder
    timestamp?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchEventAvgOrderByAggregateInput = {
    minute?: SortOrder
  }

  export type MatchEventMaxOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    type?: SortOrder
    team?: SortOrder
    player?: SortOrder
    minute?: SortOrder
    timestamp?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchEventMinOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    type?: SortOrder
    team?: SortOrder
    player?: SortOrder
    minute?: SortOrder
    timestamp?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchEventSumOrderByAggregateInput = {
    minute?: SortOrder
  }

  export type CommentaryScalarRelationFilter = {
    is?: CommentaryWhereInput
    isNot?: CommentaryWhereInput
  }

  export type CommentaryEventCountOrderByAggregateInput = {
    id?: SortOrder
    commentaryId?: SortOrder
    type?: SortOrder
    gameMinute?: SortOrder
    audioTimestamp?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentaryEventAvgOrderByAggregateInput = {
    gameMinute?: SortOrder
    audioTimestamp?: SortOrder
  }

  export type CommentaryEventMaxOrderByAggregateInput = {
    id?: SortOrder
    commentaryId?: SortOrder
    type?: SortOrder
    gameMinute?: SortOrder
    audioTimestamp?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentaryEventMinOrderByAggregateInput = {
    id?: SortOrder
    commentaryId?: SortOrder
    type?: SortOrder
    gameMinute?: SortOrder
    audioTimestamp?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentaryEventSumOrderByAggregateInput = {
    gameMinute?: SortOrder
    audioTimestamp?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SyncReportCountOrderByAggregateInput = {
    id?: SortOrder
    commentaryId?: SortOrder
    userId?: SortOrder
    reportedOffset?: SortOrder
    userAgent?: SortOrder
    streamPlatform?: SortOrder
    createdAt?: SortOrder
  }

  export type SyncReportAvgOrderByAggregateInput = {
    reportedOffset?: SortOrder
  }

  export type SyncReportMaxOrderByAggregateInput = {
    id?: SortOrder
    commentaryId?: SortOrder
    userId?: SortOrder
    reportedOffset?: SortOrder
    userAgent?: SortOrder
    streamPlatform?: SortOrder
    createdAt?: SortOrder
  }

  export type SyncReportMinOrderByAggregateInput = {
    id?: SortOrder
    commentaryId?: SortOrder
    userId?: SortOrder
    reportedOffset?: SortOrder
    userAgent?: SortOrder
    streamPlatform?: SortOrder
    createdAt?: SortOrder
  }

  export type SyncReportSumOrderByAggregateInput = {
    reportedOffset?: SortOrder
  }

  export type CommentaryCreateNestedManyWithoutCommentatorInput = {
    create?: XOR<CommentaryCreateWithoutCommentatorInput, CommentaryUncheckedCreateWithoutCommentatorInput> | CommentaryCreateWithoutCommentatorInput[] | CommentaryUncheckedCreateWithoutCommentatorInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutCommentatorInput | CommentaryCreateOrConnectWithoutCommentatorInput[]
    createMany?: CommentaryCreateManyCommentatorInputEnvelope
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
  }

  export type SyncReportCreateNestedManyWithoutUserInput = {
    create?: XOR<SyncReportCreateWithoutUserInput, SyncReportUncheckedCreateWithoutUserInput> | SyncReportCreateWithoutUserInput[] | SyncReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SyncReportCreateOrConnectWithoutUserInput | SyncReportCreateOrConnectWithoutUserInput[]
    createMany?: SyncReportCreateManyUserInputEnvelope
    connect?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
  }

  export type CommentaryUncheckedCreateNestedManyWithoutCommentatorInput = {
    create?: XOR<CommentaryCreateWithoutCommentatorInput, CommentaryUncheckedCreateWithoutCommentatorInput> | CommentaryCreateWithoutCommentatorInput[] | CommentaryUncheckedCreateWithoutCommentatorInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutCommentatorInput | CommentaryCreateOrConnectWithoutCommentatorInput[]
    createMany?: CommentaryCreateManyCommentatorInputEnvelope
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
  }

  export type SyncReportUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SyncReportCreateWithoutUserInput, SyncReportUncheckedCreateWithoutUserInput> | SyncReportCreateWithoutUserInput[] | SyncReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SyncReportCreateOrConnectWithoutUserInput | SyncReportCreateOrConnectWithoutUserInput[]
    createMany?: SyncReportCreateManyUserInputEnvelope
    connect?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CommentaryUpdateManyWithoutCommentatorNestedInput = {
    create?: XOR<CommentaryCreateWithoutCommentatorInput, CommentaryUncheckedCreateWithoutCommentatorInput> | CommentaryCreateWithoutCommentatorInput[] | CommentaryUncheckedCreateWithoutCommentatorInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutCommentatorInput | CommentaryCreateOrConnectWithoutCommentatorInput[]
    upsert?: CommentaryUpsertWithWhereUniqueWithoutCommentatorInput | CommentaryUpsertWithWhereUniqueWithoutCommentatorInput[]
    createMany?: CommentaryCreateManyCommentatorInputEnvelope
    set?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    disconnect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    delete?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    update?: CommentaryUpdateWithWhereUniqueWithoutCommentatorInput | CommentaryUpdateWithWhereUniqueWithoutCommentatorInput[]
    updateMany?: CommentaryUpdateManyWithWhereWithoutCommentatorInput | CommentaryUpdateManyWithWhereWithoutCommentatorInput[]
    deleteMany?: CommentaryScalarWhereInput | CommentaryScalarWhereInput[]
  }

  export type SyncReportUpdateManyWithoutUserNestedInput = {
    create?: XOR<SyncReportCreateWithoutUserInput, SyncReportUncheckedCreateWithoutUserInput> | SyncReportCreateWithoutUserInput[] | SyncReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SyncReportCreateOrConnectWithoutUserInput | SyncReportCreateOrConnectWithoutUserInput[]
    upsert?: SyncReportUpsertWithWhereUniqueWithoutUserInput | SyncReportUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SyncReportCreateManyUserInputEnvelope
    set?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    disconnect?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    delete?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    connect?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    update?: SyncReportUpdateWithWhereUniqueWithoutUserInput | SyncReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SyncReportUpdateManyWithWhereWithoutUserInput | SyncReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SyncReportScalarWhereInput | SyncReportScalarWhereInput[]
  }

  export type CommentaryUncheckedUpdateManyWithoutCommentatorNestedInput = {
    create?: XOR<CommentaryCreateWithoutCommentatorInput, CommentaryUncheckedCreateWithoutCommentatorInput> | CommentaryCreateWithoutCommentatorInput[] | CommentaryUncheckedCreateWithoutCommentatorInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutCommentatorInput | CommentaryCreateOrConnectWithoutCommentatorInput[]
    upsert?: CommentaryUpsertWithWhereUniqueWithoutCommentatorInput | CommentaryUpsertWithWhereUniqueWithoutCommentatorInput[]
    createMany?: CommentaryCreateManyCommentatorInputEnvelope
    set?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    disconnect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    delete?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    update?: CommentaryUpdateWithWhereUniqueWithoutCommentatorInput | CommentaryUpdateWithWhereUniqueWithoutCommentatorInput[]
    updateMany?: CommentaryUpdateManyWithWhereWithoutCommentatorInput | CommentaryUpdateManyWithWhereWithoutCommentatorInput[]
    deleteMany?: CommentaryScalarWhereInput | CommentaryScalarWhereInput[]
  }

  export type SyncReportUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SyncReportCreateWithoutUserInput, SyncReportUncheckedCreateWithoutUserInput> | SyncReportCreateWithoutUserInput[] | SyncReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SyncReportCreateOrConnectWithoutUserInput | SyncReportCreateOrConnectWithoutUserInput[]
    upsert?: SyncReportUpsertWithWhereUniqueWithoutUserInput | SyncReportUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SyncReportCreateManyUserInputEnvelope
    set?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    disconnect?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    delete?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    connect?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    update?: SyncReportUpdateWithWhereUniqueWithoutUserInput | SyncReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SyncReportUpdateManyWithWhereWithoutUserInput | SyncReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SyncReportScalarWhereInput | SyncReportScalarWhereInput[]
  }

  export type MatchCreatestreamUrlPatternsInput = {
    set: string[]
  }

  export type CommentaryCreateNestedManyWithoutMatchInput = {
    create?: XOR<CommentaryCreateWithoutMatchInput, CommentaryUncheckedCreateWithoutMatchInput> | CommentaryCreateWithoutMatchInput[] | CommentaryUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutMatchInput | CommentaryCreateOrConnectWithoutMatchInput[]
    createMany?: CommentaryCreateManyMatchInputEnvelope
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
  }

  export type MatchEventCreateNestedManyWithoutMatchInput = {
    create?: XOR<MatchEventCreateWithoutMatchInput, MatchEventUncheckedCreateWithoutMatchInput> | MatchEventCreateWithoutMatchInput[] | MatchEventUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchEventCreateOrConnectWithoutMatchInput | MatchEventCreateOrConnectWithoutMatchInput[]
    createMany?: MatchEventCreateManyMatchInputEnvelope
    connect?: MatchEventWhereUniqueInput | MatchEventWhereUniqueInput[]
  }

  export type CommentaryUncheckedCreateNestedManyWithoutMatchInput = {
    create?: XOR<CommentaryCreateWithoutMatchInput, CommentaryUncheckedCreateWithoutMatchInput> | CommentaryCreateWithoutMatchInput[] | CommentaryUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutMatchInput | CommentaryCreateOrConnectWithoutMatchInput[]
    createMany?: CommentaryCreateManyMatchInputEnvelope
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
  }

  export type MatchEventUncheckedCreateNestedManyWithoutMatchInput = {
    create?: XOR<MatchEventCreateWithoutMatchInput, MatchEventUncheckedCreateWithoutMatchInput> | MatchEventCreateWithoutMatchInput[] | MatchEventUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchEventCreateOrConnectWithoutMatchInput | MatchEventCreateOrConnectWithoutMatchInput[]
    createMany?: MatchEventCreateManyMatchInputEnvelope
    connect?: MatchEventWhereUniqueInput | MatchEventWhereUniqueInput[]
  }

  export type MatchUpdatestreamUrlPatternsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CommentaryUpdateManyWithoutMatchNestedInput = {
    create?: XOR<CommentaryCreateWithoutMatchInput, CommentaryUncheckedCreateWithoutMatchInput> | CommentaryCreateWithoutMatchInput[] | CommentaryUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutMatchInput | CommentaryCreateOrConnectWithoutMatchInput[]
    upsert?: CommentaryUpsertWithWhereUniqueWithoutMatchInput | CommentaryUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: CommentaryCreateManyMatchInputEnvelope
    set?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    disconnect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    delete?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    update?: CommentaryUpdateWithWhereUniqueWithoutMatchInput | CommentaryUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: CommentaryUpdateManyWithWhereWithoutMatchInput | CommentaryUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: CommentaryScalarWhereInput | CommentaryScalarWhereInput[]
  }

  export type MatchEventUpdateManyWithoutMatchNestedInput = {
    create?: XOR<MatchEventCreateWithoutMatchInput, MatchEventUncheckedCreateWithoutMatchInput> | MatchEventCreateWithoutMatchInput[] | MatchEventUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchEventCreateOrConnectWithoutMatchInput | MatchEventCreateOrConnectWithoutMatchInput[]
    upsert?: MatchEventUpsertWithWhereUniqueWithoutMatchInput | MatchEventUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: MatchEventCreateManyMatchInputEnvelope
    set?: MatchEventWhereUniqueInput | MatchEventWhereUniqueInput[]
    disconnect?: MatchEventWhereUniqueInput | MatchEventWhereUniqueInput[]
    delete?: MatchEventWhereUniqueInput | MatchEventWhereUniqueInput[]
    connect?: MatchEventWhereUniqueInput | MatchEventWhereUniqueInput[]
    update?: MatchEventUpdateWithWhereUniqueWithoutMatchInput | MatchEventUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: MatchEventUpdateManyWithWhereWithoutMatchInput | MatchEventUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: MatchEventScalarWhereInput | MatchEventScalarWhereInput[]
  }

  export type CommentaryUncheckedUpdateManyWithoutMatchNestedInput = {
    create?: XOR<CommentaryCreateWithoutMatchInput, CommentaryUncheckedCreateWithoutMatchInput> | CommentaryCreateWithoutMatchInput[] | CommentaryUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: CommentaryCreateOrConnectWithoutMatchInput | CommentaryCreateOrConnectWithoutMatchInput[]
    upsert?: CommentaryUpsertWithWhereUniqueWithoutMatchInput | CommentaryUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: CommentaryCreateManyMatchInputEnvelope
    set?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    disconnect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    delete?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    connect?: CommentaryWhereUniqueInput | CommentaryWhereUniqueInput[]
    update?: CommentaryUpdateWithWhereUniqueWithoutMatchInput | CommentaryUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: CommentaryUpdateManyWithWhereWithoutMatchInput | CommentaryUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: CommentaryScalarWhereInput | CommentaryScalarWhereInput[]
  }

  export type MatchEventUncheckedUpdateManyWithoutMatchNestedInput = {
    create?: XOR<MatchEventCreateWithoutMatchInput, MatchEventUncheckedCreateWithoutMatchInput> | MatchEventCreateWithoutMatchInput[] | MatchEventUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchEventCreateOrConnectWithoutMatchInput | MatchEventCreateOrConnectWithoutMatchInput[]
    upsert?: MatchEventUpsertWithWhereUniqueWithoutMatchInput | MatchEventUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: MatchEventCreateManyMatchInputEnvelope
    set?: MatchEventWhereUniqueInput | MatchEventWhereUniqueInput[]
    disconnect?: MatchEventWhereUniqueInput | MatchEventWhereUniqueInput[]
    delete?: MatchEventWhereUniqueInput | MatchEventWhereUniqueInput[]
    connect?: MatchEventWhereUniqueInput | MatchEventWhereUniqueInput[]
    update?: MatchEventUpdateWithWhereUniqueWithoutMatchInput | MatchEventUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: MatchEventUpdateManyWithWhereWithoutMatchInput | MatchEventUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: MatchEventScalarWhereInput | MatchEventScalarWhereInput[]
  }

  export type MatchCreateNestedOneWithoutCommentariesInput = {
    create?: XOR<MatchCreateWithoutCommentariesInput, MatchUncheckedCreateWithoutCommentariesInput>
    connectOrCreate?: MatchCreateOrConnectWithoutCommentariesInput
    connect?: MatchWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCommentariesInput = {
    create?: XOR<UserCreateWithoutCommentariesInput, UserUncheckedCreateWithoutCommentariesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentariesInput
    connect?: UserWhereUniqueInput
  }

  export type CommentaryEventCreateNestedManyWithoutCommentaryInput = {
    create?: XOR<CommentaryEventCreateWithoutCommentaryInput, CommentaryEventUncheckedCreateWithoutCommentaryInput> | CommentaryEventCreateWithoutCommentaryInput[] | CommentaryEventUncheckedCreateWithoutCommentaryInput[]
    connectOrCreate?: CommentaryEventCreateOrConnectWithoutCommentaryInput | CommentaryEventCreateOrConnectWithoutCommentaryInput[]
    createMany?: CommentaryEventCreateManyCommentaryInputEnvelope
    connect?: CommentaryEventWhereUniqueInput | CommentaryEventWhereUniqueInput[]
  }

  export type SyncReportCreateNestedManyWithoutCommentaryInput = {
    create?: XOR<SyncReportCreateWithoutCommentaryInput, SyncReportUncheckedCreateWithoutCommentaryInput> | SyncReportCreateWithoutCommentaryInput[] | SyncReportUncheckedCreateWithoutCommentaryInput[]
    connectOrCreate?: SyncReportCreateOrConnectWithoutCommentaryInput | SyncReportCreateOrConnectWithoutCommentaryInput[]
    createMany?: SyncReportCreateManyCommentaryInputEnvelope
    connect?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
  }

  export type CommentaryEventUncheckedCreateNestedManyWithoutCommentaryInput = {
    create?: XOR<CommentaryEventCreateWithoutCommentaryInput, CommentaryEventUncheckedCreateWithoutCommentaryInput> | CommentaryEventCreateWithoutCommentaryInput[] | CommentaryEventUncheckedCreateWithoutCommentaryInput[]
    connectOrCreate?: CommentaryEventCreateOrConnectWithoutCommentaryInput | CommentaryEventCreateOrConnectWithoutCommentaryInput[]
    createMany?: CommentaryEventCreateManyCommentaryInputEnvelope
    connect?: CommentaryEventWhereUniqueInput | CommentaryEventWhereUniqueInput[]
  }

  export type SyncReportUncheckedCreateNestedManyWithoutCommentaryInput = {
    create?: XOR<SyncReportCreateWithoutCommentaryInput, SyncReportUncheckedCreateWithoutCommentaryInput> | SyncReportCreateWithoutCommentaryInput[] | SyncReportUncheckedCreateWithoutCommentaryInput[]
    connectOrCreate?: SyncReportCreateOrConnectWithoutCommentaryInput | SyncReportCreateOrConnectWithoutCommentaryInput[]
    createMany?: SyncReportCreateManyCommentaryInputEnvelope
    connect?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type MatchUpdateOneRequiredWithoutCommentariesNestedInput = {
    create?: XOR<MatchCreateWithoutCommentariesInput, MatchUncheckedCreateWithoutCommentariesInput>
    connectOrCreate?: MatchCreateOrConnectWithoutCommentariesInput
    upsert?: MatchUpsertWithoutCommentariesInput
    connect?: MatchWhereUniqueInput
    update?: XOR<XOR<MatchUpdateToOneWithWhereWithoutCommentariesInput, MatchUpdateWithoutCommentariesInput>, MatchUncheckedUpdateWithoutCommentariesInput>
  }

  export type UserUpdateOneRequiredWithoutCommentariesNestedInput = {
    create?: XOR<UserCreateWithoutCommentariesInput, UserUncheckedCreateWithoutCommentariesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentariesInput
    upsert?: UserUpsertWithoutCommentariesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentariesInput, UserUpdateWithoutCommentariesInput>, UserUncheckedUpdateWithoutCommentariesInput>
  }

  export type CommentaryEventUpdateManyWithoutCommentaryNestedInput = {
    create?: XOR<CommentaryEventCreateWithoutCommentaryInput, CommentaryEventUncheckedCreateWithoutCommentaryInput> | CommentaryEventCreateWithoutCommentaryInput[] | CommentaryEventUncheckedCreateWithoutCommentaryInput[]
    connectOrCreate?: CommentaryEventCreateOrConnectWithoutCommentaryInput | CommentaryEventCreateOrConnectWithoutCommentaryInput[]
    upsert?: CommentaryEventUpsertWithWhereUniqueWithoutCommentaryInput | CommentaryEventUpsertWithWhereUniqueWithoutCommentaryInput[]
    createMany?: CommentaryEventCreateManyCommentaryInputEnvelope
    set?: CommentaryEventWhereUniqueInput | CommentaryEventWhereUniqueInput[]
    disconnect?: CommentaryEventWhereUniqueInput | CommentaryEventWhereUniqueInput[]
    delete?: CommentaryEventWhereUniqueInput | CommentaryEventWhereUniqueInput[]
    connect?: CommentaryEventWhereUniqueInput | CommentaryEventWhereUniqueInput[]
    update?: CommentaryEventUpdateWithWhereUniqueWithoutCommentaryInput | CommentaryEventUpdateWithWhereUniqueWithoutCommentaryInput[]
    updateMany?: CommentaryEventUpdateManyWithWhereWithoutCommentaryInput | CommentaryEventUpdateManyWithWhereWithoutCommentaryInput[]
    deleteMany?: CommentaryEventScalarWhereInput | CommentaryEventScalarWhereInput[]
  }

  export type SyncReportUpdateManyWithoutCommentaryNestedInput = {
    create?: XOR<SyncReportCreateWithoutCommentaryInput, SyncReportUncheckedCreateWithoutCommentaryInput> | SyncReportCreateWithoutCommentaryInput[] | SyncReportUncheckedCreateWithoutCommentaryInput[]
    connectOrCreate?: SyncReportCreateOrConnectWithoutCommentaryInput | SyncReportCreateOrConnectWithoutCommentaryInput[]
    upsert?: SyncReportUpsertWithWhereUniqueWithoutCommentaryInput | SyncReportUpsertWithWhereUniqueWithoutCommentaryInput[]
    createMany?: SyncReportCreateManyCommentaryInputEnvelope
    set?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    disconnect?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    delete?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    connect?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    update?: SyncReportUpdateWithWhereUniqueWithoutCommentaryInput | SyncReportUpdateWithWhereUniqueWithoutCommentaryInput[]
    updateMany?: SyncReportUpdateManyWithWhereWithoutCommentaryInput | SyncReportUpdateManyWithWhereWithoutCommentaryInput[]
    deleteMany?: SyncReportScalarWhereInput | SyncReportScalarWhereInput[]
  }

  export type CommentaryEventUncheckedUpdateManyWithoutCommentaryNestedInput = {
    create?: XOR<CommentaryEventCreateWithoutCommentaryInput, CommentaryEventUncheckedCreateWithoutCommentaryInput> | CommentaryEventCreateWithoutCommentaryInput[] | CommentaryEventUncheckedCreateWithoutCommentaryInput[]
    connectOrCreate?: CommentaryEventCreateOrConnectWithoutCommentaryInput | CommentaryEventCreateOrConnectWithoutCommentaryInput[]
    upsert?: CommentaryEventUpsertWithWhereUniqueWithoutCommentaryInput | CommentaryEventUpsertWithWhereUniqueWithoutCommentaryInput[]
    createMany?: CommentaryEventCreateManyCommentaryInputEnvelope
    set?: CommentaryEventWhereUniqueInput | CommentaryEventWhereUniqueInput[]
    disconnect?: CommentaryEventWhereUniqueInput | CommentaryEventWhereUniqueInput[]
    delete?: CommentaryEventWhereUniqueInput | CommentaryEventWhereUniqueInput[]
    connect?: CommentaryEventWhereUniqueInput | CommentaryEventWhereUniqueInput[]
    update?: CommentaryEventUpdateWithWhereUniqueWithoutCommentaryInput | CommentaryEventUpdateWithWhereUniqueWithoutCommentaryInput[]
    updateMany?: CommentaryEventUpdateManyWithWhereWithoutCommentaryInput | CommentaryEventUpdateManyWithWhereWithoutCommentaryInput[]
    deleteMany?: CommentaryEventScalarWhereInput | CommentaryEventScalarWhereInput[]
  }

  export type SyncReportUncheckedUpdateManyWithoutCommentaryNestedInput = {
    create?: XOR<SyncReportCreateWithoutCommentaryInput, SyncReportUncheckedCreateWithoutCommentaryInput> | SyncReportCreateWithoutCommentaryInput[] | SyncReportUncheckedCreateWithoutCommentaryInput[]
    connectOrCreate?: SyncReportCreateOrConnectWithoutCommentaryInput | SyncReportCreateOrConnectWithoutCommentaryInput[]
    upsert?: SyncReportUpsertWithWhereUniqueWithoutCommentaryInput | SyncReportUpsertWithWhereUniqueWithoutCommentaryInput[]
    createMany?: SyncReportCreateManyCommentaryInputEnvelope
    set?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    disconnect?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    delete?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    connect?: SyncReportWhereUniqueInput | SyncReportWhereUniqueInput[]
    update?: SyncReportUpdateWithWhereUniqueWithoutCommentaryInput | SyncReportUpdateWithWhereUniqueWithoutCommentaryInput[]
    updateMany?: SyncReportUpdateManyWithWhereWithoutCommentaryInput | SyncReportUpdateManyWithWhereWithoutCommentaryInput[]
    deleteMany?: SyncReportScalarWhereInput | SyncReportScalarWhereInput[]
  }

  export type MatchCreateNestedOneWithoutEventsInput = {
    create?: XOR<MatchCreateWithoutEventsInput, MatchUncheckedCreateWithoutEventsInput>
    connectOrCreate?: MatchCreateOrConnectWithoutEventsInput
    connect?: MatchWhereUniqueInput
  }

  export type MatchUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<MatchCreateWithoutEventsInput, MatchUncheckedCreateWithoutEventsInput>
    connectOrCreate?: MatchCreateOrConnectWithoutEventsInput
    upsert?: MatchUpsertWithoutEventsInput
    connect?: MatchWhereUniqueInput
    update?: XOR<XOR<MatchUpdateToOneWithWhereWithoutEventsInput, MatchUpdateWithoutEventsInput>, MatchUncheckedUpdateWithoutEventsInput>
  }

  export type CommentaryCreateNestedOneWithoutEventsInput = {
    create?: XOR<CommentaryCreateWithoutEventsInput, CommentaryUncheckedCreateWithoutEventsInput>
    connectOrCreate?: CommentaryCreateOrConnectWithoutEventsInput
    connect?: CommentaryWhereUniqueInput
  }

  export type CommentaryUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<CommentaryCreateWithoutEventsInput, CommentaryUncheckedCreateWithoutEventsInput>
    connectOrCreate?: CommentaryCreateOrConnectWithoutEventsInput
    upsert?: CommentaryUpsertWithoutEventsInput
    connect?: CommentaryWhereUniqueInput
    update?: XOR<XOR<CommentaryUpdateToOneWithWhereWithoutEventsInput, CommentaryUpdateWithoutEventsInput>, CommentaryUncheckedUpdateWithoutEventsInput>
  }

  export type CommentaryCreateNestedOneWithoutSyncReportsInput = {
    create?: XOR<CommentaryCreateWithoutSyncReportsInput, CommentaryUncheckedCreateWithoutSyncReportsInput>
    connectOrCreate?: CommentaryCreateOrConnectWithoutSyncReportsInput
    connect?: CommentaryWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSyncReportsInput = {
    create?: XOR<UserCreateWithoutSyncReportsInput, UserUncheckedCreateWithoutSyncReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSyncReportsInput
    connect?: UserWhereUniqueInput
  }

  export type CommentaryUpdateOneRequiredWithoutSyncReportsNestedInput = {
    create?: XOR<CommentaryCreateWithoutSyncReportsInput, CommentaryUncheckedCreateWithoutSyncReportsInput>
    connectOrCreate?: CommentaryCreateOrConnectWithoutSyncReportsInput
    upsert?: CommentaryUpsertWithoutSyncReportsInput
    connect?: CommentaryWhereUniqueInput
    update?: XOR<XOR<CommentaryUpdateToOneWithWhereWithoutSyncReportsInput, CommentaryUpdateWithoutSyncReportsInput>, CommentaryUncheckedUpdateWithoutSyncReportsInput>
  }

  export type UserUpdateOneWithoutSyncReportsNestedInput = {
    create?: XOR<UserCreateWithoutSyncReportsInput, UserUncheckedCreateWithoutSyncReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSyncReportsInput
    upsert?: UserUpsertWithoutSyncReportsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSyncReportsInput, UserUpdateWithoutSyncReportsInput>, UserUncheckedUpdateWithoutSyncReportsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CommentaryCreateWithoutCommentatorInput = {
    id?: string
    title: string
    description?: string | null
    audioUrl?: string | null
    duration?: number
    youtubeStreamUrl?: string | null
    youtubeStreamId?: string | null
    status?: string
    language?: string
    baselineOffset?: number
    avgLatency?: number
    viewCount?: number
    rating?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    match: MatchCreateNestedOneWithoutCommentariesInput
    events?: CommentaryEventCreateNestedManyWithoutCommentaryInput
    syncReports?: SyncReportCreateNestedManyWithoutCommentaryInput
  }

  export type CommentaryUncheckedCreateWithoutCommentatorInput = {
    id?: string
    matchId: string
    title: string
    description?: string | null
    audioUrl?: string | null
    duration?: number
    youtubeStreamUrl?: string | null
    youtubeStreamId?: string | null
    status?: string
    language?: string
    baselineOffset?: number
    avgLatency?: number
    viewCount?: number
    rating?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: CommentaryEventUncheckedCreateNestedManyWithoutCommentaryInput
    syncReports?: SyncReportUncheckedCreateNestedManyWithoutCommentaryInput
  }

  export type CommentaryCreateOrConnectWithoutCommentatorInput = {
    where: CommentaryWhereUniqueInput
    create: XOR<CommentaryCreateWithoutCommentatorInput, CommentaryUncheckedCreateWithoutCommentatorInput>
  }

  export type CommentaryCreateManyCommentatorInputEnvelope = {
    data: CommentaryCreateManyCommentatorInput | CommentaryCreateManyCommentatorInput[]
    skipDuplicates?: boolean
  }

  export type SyncReportCreateWithoutUserInput = {
    id?: string
    reportedOffset: number
    userAgent?: string | null
    streamPlatform?: string | null
    createdAt?: Date | string
    commentary: CommentaryCreateNestedOneWithoutSyncReportsInput
  }

  export type SyncReportUncheckedCreateWithoutUserInput = {
    id?: string
    commentaryId: string
    reportedOffset: number
    userAgent?: string | null
    streamPlatform?: string | null
    createdAt?: Date | string
  }

  export type SyncReportCreateOrConnectWithoutUserInput = {
    where: SyncReportWhereUniqueInput
    create: XOR<SyncReportCreateWithoutUserInput, SyncReportUncheckedCreateWithoutUserInput>
  }

  export type SyncReportCreateManyUserInputEnvelope = {
    data: SyncReportCreateManyUserInput | SyncReportCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommentaryUpsertWithWhereUniqueWithoutCommentatorInput = {
    where: CommentaryWhereUniqueInput
    update: XOR<CommentaryUpdateWithoutCommentatorInput, CommentaryUncheckedUpdateWithoutCommentatorInput>
    create: XOR<CommentaryCreateWithoutCommentatorInput, CommentaryUncheckedCreateWithoutCommentatorInput>
  }

  export type CommentaryUpdateWithWhereUniqueWithoutCommentatorInput = {
    where: CommentaryWhereUniqueInput
    data: XOR<CommentaryUpdateWithoutCommentatorInput, CommentaryUncheckedUpdateWithoutCommentatorInput>
  }

  export type CommentaryUpdateManyWithWhereWithoutCommentatorInput = {
    where: CommentaryScalarWhereInput
    data: XOR<CommentaryUpdateManyMutationInput, CommentaryUncheckedUpdateManyWithoutCommentatorInput>
  }

  export type CommentaryScalarWhereInput = {
    AND?: CommentaryScalarWhereInput | CommentaryScalarWhereInput[]
    OR?: CommentaryScalarWhereInput[]
    NOT?: CommentaryScalarWhereInput | CommentaryScalarWhereInput[]
    id?: StringFilter<"Commentary"> | string
    matchId?: StringFilter<"Commentary"> | string
    commentatorId?: StringFilter<"Commentary"> | string
    title?: StringFilter<"Commentary"> | string
    description?: StringNullableFilter<"Commentary"> | string | null
    audioUrl?: StringNullableFilter<"Commentary"> | string | null
    duration?: IntFilter<"Commentary"> | number
    youtubeStreamUrl?: StringNullableFilter<"Commentary"> | string | null
    youtubeStreamId?: StringNullableFilter<"Commentary"> | string | null
    status?: StringFilter<"Commentary"> | string
    language?: StringFilter<"Commentary"> | string
    baselineOffset?: IntFilter<"Commentary"> | number
    avgLatency?: IntFilter<"Commentary"> | number
    viewCount?: IntFilter<"Commentary"> | number
    rating?: FloatFilter<"Commentary"> | number
    startedAt?: DateTimeNullableFilter<"Commentary"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"Commentary"> | Date | string | null
    createdAt?: DateTimeFilter<"Commentary"> | Date | string
    updatedAt?: DateTimeFilter<"Commentary"> | Date | string
  }

  export type SyncReportUpsertWithWhereUniqueWithoutUserInput = {
    where: SyncReportWhereUniqueInput
    update: XOR<SyncReportUpdateWithoutUserInput, SyncReportUncheckedUpdateWithoutUserInput>
    create: XOR<SyncReportCreateWithoutUserInput, SyncReportUncheckedCreateWithoutUserInput>
  }

  export type SyncReportUpdateWithWhereUniqueWithoutUserInput = {
    where: SyncReportWhereUniqueInput
    data: XOR<SyncReportUpdateWithoutUserInput, SyncReportUncheckedUpdateWithoutUserInput>
  }

  export type SyncReportUpdateManyWithWhereWithoutUserInput = {
    where: SyncReportScalarWhereInput
    data: XOR<SyncReportUpdateManyMutationInput, SyncReportUncheckedUpdateManyWithoutUserInput>
  }

  export type SyncReportScalarWhereInput = {
    AND?: SyncReportScalarWhereInput | SyncReportScalarWhereInput[]
    OR?: SyncReportScalarWhereInput[]
    NOT?: SyncReportScalarWhereInput | SyncReportScalarWhereInput[]
    id?: StringFilter<"SyncReport"> | string
    commentaryId?: StringFilter<"SyncReport"> | string
    userId?: StringNullableFilter<"SyncReport"> | string | null
    reportedOffset?: IntFilter<"SyncReport"> | number
    userAgent?: StringNullableFilter<"SyncReport"> | string | null
    streamPlatform?: StringNullableFilter<"SyncReport"> | string | null
    createdAt?: DateTimeFilter<"SyncReport"> | Date | string
  }

  export type CommentaryCreateWithoutMatchInput = {
    id?: string
    title: string
    description?: string | null
    audioUrl?: string | null
    duration?: number
    youtubeStreamUrl?: string | null
    youtubeStreamId?: string | null
    status?: string
    language?: string
    baselineOffset?: number
    avgLatency?: number
    viewCount?: number
    rating?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    commentator: UserCreateNestedOneWithoutCommentariesInput
    events?: CommentaryEventCreateNestedManyWithoutCommentaryInput
    syncReports?: SyncReportCreateNestedManyWithoutCommentaryInput
  }

  export type CommentaryUncheckedCreateWithoutMatchInput = {
    id?: string
    commentatorId: string
    title: string
    description?: string | null
    audioUrl?: string | null
    duration?: number
    youtubeStreamUrl?: string | null
    youtubeStreamId?: string | null
    status?: string
    language?: string
    baselineOffset?: number
    avgLatency?: number
    viewCount?: number
    rating?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: CommentaryEventUncheckedCreateNestedManyWithoutCommentaryInput
    syncReports?: SyncReportUncheckedCreateNestedManyWithoutCommentaryInput
  }

  export type CommentaryCreateOrConnectWithoutMatchInput = {
    where: CommentaryWhereUniqueInput
    create: XOR<CommentaryCreateWithoutMatchInput, CommentaryUncheckedCreateWithoutMatchInput>
  }

  export type CommentaryCreateManyMatchInputEnvelope = {
    data: CommentaryCreateManyMatchInput | CommentaryCreateManyMatchInput[]
    skipDuplicates?: boolean
  }

  export type MatchEventCreateWithoutMatchInput = {
    id?: string
    type: string
    team?: string | null
    player?: string | null
    minute: number
    timestamp: Date | string
    description?: string | null
    createdAt?: Date | string
  }

  export type MatchEventUncheckedCreateWithoutMatchInput = {
    id?: string
    type: string
    team?: string | null
    player?: string | null
    minute: number
    timestamp: Date | string
    description?: string | null
    createdAt?: Date | string
  }

  export type MatchEventCreateOrConnectWithoutMatchInput = {
    where: MatchEventWhereUniqueInput
    create: XOR<MatchEventCreateWithoutMatchInput, MatchEventUncheckedCreateWithoutMatchInput>
  }

  export type MatchEventCreateManyMatchInputEnvelope = {
    data: MatchEventCreateManyMatchInput | MatchEventCreateManyMatchInput[]
    skipDuplicates?: boolean
  }

  export type CommentaryUpsertWithWhereUniqueWithoutMatchInput = {
    where: CommentaryWhereUniqueInput
    update: XOR<CommentaryUpdateWithoutMatchInput, CommentaryUncheckedUpdateWithoutMatchInput>
    create: XOR<CommentaryCreateWithoutMatchInput, CommentaryUncheckedCreateWithoutMatchInput>
  }

  export type CommentaryUpdateWithWhereUniqueWithoutMatchInput = {
    where: CommentaryWhereUniqueInput
    data: XOR<CommentaryUpdateWithoutMatchInput, CommentaryUncheckedUpdateWithoutMatchInput>
  }

  export type CommentaryUpdateManyWithWhereWithoutMatchInput = {
    where: CommentaryScalarWhereInput
    data: XOR<CommentaryUpdateManyMutationInput, CommentaryUncheckedUpdateManyWithoutMatchInput>
  }

  export type MatchEventUpsertWithWhereUniqueWithoutMatchInput = {
    where: MatchEventWhereUniqueInput
    update: XOR<MatchEventUpdateWithoutMatchInput, MatchEventUncheckedUpdateWithoutMatchInput>
    create: XOR<MatchEventCreateWithoutMatchInput, MatchEventUncheckedCreateWithoutMatchInput>
  }

  export type MatchEventUpdateWithWhereUniqueWithoutMatchInput = {
    where: MatchEventWhereUniqueInput
    data: XOR<MatchEventUpdateWithoutMatchInput, MatchEventUncheckedUpdateWithoutMatchInput>
  }

  export type MatchEventUpdateManyWithWhereWithoutMatchInput = {
    where: MatchEventScalarWhereInput
    data: XOR<MatchEventUpdateManyMutationInput, MatchEventUncheckedUpdateManyWithoutMatchInput>
  }

  export type MatchEventScalarWhereInput = {
    AND?: MatchEventScalarWhereInput | MatchEventScalarWhereInput[]
    OR?: MatchEventScalarWhereInput[]
    NOT?: MatchEventScalarWhereInput | MatchEventScalarWhereInput[]
    id?: StringFilter<"MatchEvent"> | string
    matchId?: StringFilter<"MatchEvent"> | string
    type?: StringFilter<"MatchEvent"> | string
    team?: StringNullableFilter<"MatchEvent"> | string | null
    player?: StringNullableFilter<"MatchEvent"> | string | null
    minute?: IntFilter<"MatchEvent"> | number
    timestamp?: DateTimeFilter<"MatchEvent"> | Date | string
    description?: StringNullableFilter<"MatchEvent"> | string | null
    createdAt?: DateTimeFilter<"MatchEvent"> | Date | string
  }

  export type MatchCreateWithoutCommentariesInput = {
    id?: string
    league: string
    homeTeam: string
    awayTeam: string
    scheduledTime: Date | string
    streamUrlPatterns?: MatchCreatestreamUrlPatternsInput | string[]
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: MatchEventCreateNestedManyWithoutMatchInput
  }

  export type MatchUncheckedCreateWithoutCommentariesInput = {
    id?: string
    league: string
    homeTeam: string
    awayTeam: string
    scheduledTime: Date | string
    streamUrlPatterns?: MatchCreatestreamUrlPatternsInput | string[]
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: MatchEventUncheckedCreateNestedManyWithoutMatchInput
  }

  export type MatchCreateOrConnectWithoutCommentariesInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutCommentariesInput, MatchUncheckedCreateWithoutCommentariesInput>
  }

  export type UserCreateWithoutCommentariesInput = {
    id?: string
    email: string
    name: string
    password: string
    isCommentator?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncReports?: SyncReportCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentariesInput = {
    id?: string
    email: string
    name: string
    password: string
    isCommentator?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    syncReports?: SyncReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentariesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentariesInput, UserUncheckedCreateWithoutCommentariesInput>
  }

  export type CommentaryEventCreateWithoutCommentaryInput = {
    id?: string
    type: string
    gameMinute: number
    audioTimestamp: number
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type CommentaryEventUncheckedCreateWithoutCommentaryInput = {
    id?: string
    type: string
    gameMinute: number
    audioTimestamp: number
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type CommentaryEventCreateOrConnectWithoutCommentaryInput = {
    where: CommentaryEventWhereUniqueInput
    create: XOR<CommentaryEventCreateWithoutCommentaryInput, CommentaryEventUncheckedCreateWithoutCommentaryInput>
  }

  export type CommentaryEventCreateManyCommentaryInputEnvelope = {
    data: CommentaryEventCreateManyCommentaryInput | CommentaryEventCreateManyCommentaryInput[]
    skipDuplicates?: boolean
  }

  export type SyncReportCreateWithoutCommentaryInput = {
    id?: string
    reportedOffset: number
    userAgent?: string | null
    streamPlatform?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutSyncReportsInput
  }

  export type SyncReportUncheckedCreateWithoutCommentaryInput = {
    id?: string
    userId?: string | null
    reportedOffset: number
    userAgent?: string | null
    streamPlatform?: string | null
    createdAt?: Date | string
  }

  export type SyncReportCreateOrConnectWithoutCommentaryInput = {
    where: SyncReportWhereUniqueInput
    create: XOR<SyncReportCreateWithoutCommentaryInput, SyncReportUncheckedCreateWithoutCommentaryInput>
  }

  export type SyncReportCreateManyCommentaryInputEnvelope = {
    data: SyncReportCreateManyCommentaryInput | SyncReportCreateManyCommentaryInput[]
    skipDuplicates?: boolean
  }

  export type MatchUpsertWithoutCommentariesInput = {
    update: XOR<MatchUpdateWithoutCommentariesInput, MatchUncheckedUpdateWithoutCommentariesInput>
    create: XOR<MatchCreateWithoutCommentariesInput, MatchUncheckedCreateWithoutCommentariesInput>
    where?: MatchWhereInput
  }

  export type MatchUpdateToOneWithWhereWithoutCommentariesInput = {
    where?: MatchWhereInput
    data: XOR<MatchUpdateWithoutCommentariesInput, MatchUncheckedUpdateWithoutCommentariesInput>
  }

  export type MatchUpdateWithoutCommentariesInput = {
    id?: StringFieldUpdateOperationsInput | string
    league?: StringFieldUpdateOperationsInput | string
    homeTeam?: StringFieldUpdateOperationsInput | string
    awayTeam?: StringFieldUpdateOperationsInput | string
    scheduledTime?: DateTimeFieldUpdateOperationsInput | Date | string
    streamUrlPatterns?: MatchUpdatestreamUrlPatternsInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: MatchEventUpdateManyWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateWithoutCommentariesInput = {
    id?: StringFieldUpdateOperationsInput | string
    league?: StringFieldUpdateOperationsInput | string
    homeTeam?: StringFieldUpdateOperationsInput | string
    awayTeam?: StringFieldUpdateOperationsInput | string
    scheduledTime?: DateTimeFieldUpdateOperationsInput | Date | string
    streamUrlPatterns?: MatchUpdatestreamUrlPatternsInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: MatchEventUncheckedUpdateManyWithoutMatchNestedInput
  }

  export type UserUpsertWithoutCommentariesInput = {
    update: XOR<UserUpdateWithoutCommentariesInput, UserUncheckedUpdateWithoutCommentariesInput>
    create: XOR<UserCreateWithoutCommentariesInput, UserUncheckedCreateWithoutCommentariesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentariesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentariesInput, UserUncheckedUpdateWithoutCommentariesInput>
  }

  export type UserUpdateWithoutCommentariesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isCommentator?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncReports?: SyncReportUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentariesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isCommentator?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncReports?: SyncReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CommentaryEventUpsertWithWhereUniqueWithoutCommentaryInput = {
    where: CommentaryEventWhereUniqueInput
    update: XOR<CommentaryEventUpdateWithoutCommentaryInput, CommentaryEventUncheckedUpdateWithoutCommentaryInput>
    create: XOR<CommentaryEventCreateWithoutCommentaryInput, CommentaryEventUncheckedCreateWithoutCommentaryInput>
  }

  export type CommentaryEventUpdateWithWhereUniqueWithoutCommentaryInput = {
    where: CommentaryEventWhereUniqueInput
    data: XOR<CommentaryEventUpdateWithoutCommentaryInput, CommentaryEventUncheckedUpdateWithoutCommentaryInput>
  }

  export type CommentaryEventUpdateManyWithWhereWithoutCommentaryInput = {
    where: CommentaryEventScalarWhereInput
    data: XOR<CommentaryEventUpdateManyMutationInput, CommentaryEventUncheckedUpdateManyWithoutCommentaryInput>
  }

  export type CommentaryEventScalarWhereInput = {
    AND?: CommentaryEventScalarWhereInput | CommentaryEventScalarWhereInput[]
    OR?: CommentaryEventScalarWhereInput[]
    NOT?: CommentaryEventScalarWhereInput | CommentaryEventScalarWhereInput[]
    id?: StringFilter<"CommentaryEvent"> | string
    commentaryId?: StringFilter<"CommentaryEvent"> | string
    type?: StringFilter<"CommentaryEvent"> | string
    gameMinute?: IntFilter<"CommentaryEvent"> | number
    audioTimestamp?: IntFilter<"CommentaryEvent"> | number
    timestamp?: DateTimeFilter<"CommentaryEvent"> | Date | string
    createdAt?: DateTimeFilter<"CommentaryEvent"> | Date | string
  }

  export type SyncReportUpsertWithWhereUniqueWithoutCommentaryInput = {
    where: SyncReportWhereUniqueInput
    update: XOR<SyncReportUpdateWithoutCommentaryInput, SyncReportUncheckedUpdateWithoutCommentaryInput>
    create: XOR<SyncReportCreateWithoutCommentaryInput, SyncReportUncheckedCreateWithoutCommentaryInput>
  }

  export type SyncReportUpdateWithWhereUniqueWithoutCommentaryInput = {
    where: SyncReportWhereUniqueInput
    data: XOR<SyncReportUpdateWithoutCommentaryInput, SyncReportUncheckedUpdateWithoutCommentaryInput>
  }

  export type SyncReportUpdateManyWithWhereWithoutCommentaryInput = {
    where: SyncReportScalarWhereInput
    data: XOR<SyncReportUpdateManyMutationInput, SyncReportUncheckedUpdateManyWithoutCommentaryInput>
  }

  export type MatchCreateWithoutEventsInput = {
    id?: string
    league: string
    homeTeam: string
    awayTeam: string
    scheduledTime: Date | string
    streamUrlPatterns?: MatchCreatestreamUrlPatternsInput | string[]
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    commentaries?: CommentaryCreateNestedManyWithoutMatchInput
  }

  export type MatchUncheckedCreateWithoutEventsInput = {
    id?: string
    league: string
    homeTeam: string
    awayTeam: string
    scheduledTime: Date | string
    streamUrlPatterns?: MatchCreatestreamUrlPatternsInput | string[]
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    commentaries?: CommentaryUncheckedCreateNestedManyWithoutMatchInput
  }

  export type MatchCreateOrConnectWithoutEventsInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutEventsInput, MatchUncheckedCreateWithoutEventsInput>
  }

  export type MatchUpsertWithoutEventsInput = {
    update: XOR<MatchUpdateWithoutEventsInput, MatchUncheckedUpdateWithoutEventsInput>
    create: XOR<MatchCreateWithoutEventsInput, MatchUncheckedCreateWithoutEventsInput>
    where?: MatchWhereInput
  }

  export type MatchUpdateToOneWithWhereWithoutEventsInput = {
    where?: MatchWhereInput
    data: XOR<MatchUpdateWithoutEventsInput, MatchUncheckedUpdateWithoutEventsInput>
  }

  export type MatchUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    league?: StringFieldUpdateOperationsInput | string
    homeTeam?: StringFieldUpdateOperationsInput | string
    awayTeam?: StringFieldUpdateOperationsInput | string
    scheduledTime?: DateTimeFieldUpdateOperationsInput | Date | string
    streamUrlPatterns?: MatchUpdatestreamUrlPatternsInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commentaries?: CommentaryUpdateManyWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    league?: StringFieldUpdateOperationsInput | string
    homeTeam?: StringFieldUpdateOperationsInput | string
    awayTeam?: StringFieldUpdateOperationsInput | string
    scheduledTime?: DateTimeFieldUpdateOperationsInput | Date | string
    streamUrlPatterns?: MatchUpdatestreamUrlPatternsInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commentaries?: CommentaryUncheckedUpdateManyWithoutMatchNestedInput
  }

  export type CommentaryCreateWithoutEventsInput = {
    id?: string
    title: string
    description?: string | null
    audioUrl?: string | null
    duration?: number
    youtubeStreamUrl?: string | null
    youtubeStreamId?: string | null
    status?: string
    language?: string
    baselineOffset?: number
    avgLatency?: number
    viewCount?: number
    rating?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    match: MatchCreateNestedOneWithoutCommentariesInput
    commentator: UserCreateNestedOneWithoutCommentariesInput
    syncReports?: SyncReportCreateNestedManyWithoutCommentaryInput
  }

  export type CommentaryUncheckedCreateWithoutEventsInput = {
    id?: string
    matchId: string
    commentatorId: string
    title: string
    description?: string | null
    audioUrl?: string | null
    duration?: number
    youtubeStreamUrl?: string | null
    youtubeStreamId?: string | null
    status?: string
    language?: string
    baselineOffset?: number
    avgLatency?: number
    viewCount?: number
    rating?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    syncReports?: SyncReportUncheckedCreateNestedManyWithoutCommentaryInput
  }

  export type CommentaryCreateOrConnectWithoutEventsInput = {
    where: CommentaryWhereUniqueInput
    create: XOR<CommentaryCreateWithoutEventsInput, CommentaryUncheckedCreateWithoutEventsInput>
  }

  export type CommentaryUpsertWithoutEventsInput = {
    update: XOR<CommentaryUpdateWithoutEventsInput, CommentaryUncheckedUpdateWithoutEventsInput>
    create: XOR<CommentaryCreateWithoutEventsInput, CommentaryUncheckedCreateWithoutEventsInput>
    where?: CommentaryWhereInput
  }

  export type CommentaryUpdateToOneWithWhereWithoutEventsInput = {
    where?: CommentaryWhereInput
    data: XOR<CommentaryUpdateWithoutEventsInput, CommentaryUncheckedUpdateWithoutEventsInput>
  }

  export type CommentaryUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: IntFieldUpdateOperationsInput | number
    youtubeStreamUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    baselineOffset?: IntFieldUpdateOperationsInput | number
    avgLatency?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutCommentariesNestedInput
    commentator?: UserUpdateOneRequiredWithoutCommentariesNestedInput
    syncReports?: SyncReportUpdateManyWithoutCommentaryNestedInput
  }

  export type CommentaryUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    commentatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: IntFieldUpdateOperationsInput | number
    youtubeStreamUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    baselineOffset?: IntFieldUpdateOperationsInput | number
    avgLatency?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncReports?: SyncReportUncheckedUpdateManyWithoutCommentaryNestedInput
  }

  export type CommentaryCreateWithoutSyncReportsInput = {
    id?: string
    title: string
    description?: string | null
    audioUrl?: string | null
    duration?: number
    youtubeStreamUrl?: string | null
    youtubeStreamId?: string | null
    status?: string
    language?: string
    baselineOffset?: number
    avgLatency?: number
    viewCount?: number
    rating?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    match: MatchCreateNestedOneWithoutCommentariesInput
    commentator: UserCreateNestedOneWithoutCommentariesInput
    events?: CommentaryEventCreateNestedManyWithoutCommentaryInput
  }

  export type CommentaryUncheckedCreateWithoutSyncReportsInput = {
    id?: string
    matchId: string
    commentatorId: string
    title: string
    description?: string | null
    audioUrl?: string | null
    duration?: number
    youtubeStreamUrl?: string | null
    youtubeStreamId?: string | null
    status?: string
    language?: string
    baselineOffset?: number
    avgLatency?: number
    viewCount?: number
    rating?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: CommentaryEventUncheckedCreateNestedManyWithoutCommentaryInput
  }

  export type CommentaryCreateOrConnectWithoutSyncReportsInput = {
    where: CommentaryWhereUniqueInput
    create: XOR<CommentaryCreateWithoutSyncReportsInput, CommentaryUncheckedCreateWithoutSyncReportsInput>
  }

  export type UserCreateWithoutSyncReportsInput = {
    id?: string
    email: string
    name: string
    password: string
    isCommentator?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    commentaries?: CommentaryCreateNestedManyWithoutCommentatorInput
  }

  export type UserUncheckedCreateWithoutSyncReportsInput = {
    id?: string
    email: string
    name: string
    password: string
    isCommentator?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    commentaries?: CommentaryUncheckedCreateNestedManyWithoutCommentatorInput
  }

  export type UserCreateOrConnectWithoutSyncReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSyncReportsInput, UserUncheckedCreateWithoutSyncReportsInput>
  }

  export type CommentaryUpsertWithoutSyncReportsInput = {
    update: XOR<CommentaryUpdateWithoutSyncReportsInput, CommentaryUncheckedUpdateWithoutSyncReportsInput>
    create: XOR<CommentaryCreateWithoutSyncReportsInput, CommentaryUncheckedCreateWithoutSyncReportsInput>
    where?: CommentaryWhereInput
  }

  export type CommentaryUpdateToOneWithWhereWithoutSyncReportsInput = {
    where?: CommentaryWhereInput
    data: XOR<CommentaryUpdateWithoutSyncReportsInput, CommentaryUncheckedUpdateWithoutSyncReportsInput>
  }

  export type CommentaryUpdateWithoutSyncReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: IntFieldUpdateOperationsInput | number
    youtubeStreamUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    baselineOffset?: IntFieldUpdateOperationsInput | number
    avgLatency?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutCommentariesNestedInput
    commentator?: UserUpdateOneRequiredWithoutCommentariesNestedInput
    events?: CommentaryEventUpdateManyWithoutCommentaryNestedInput
  }

  export type CommentaryUncheckedUpdateWithoutSyncReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    commentatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: IntFieldUpdateOperationsInput | number
    youtubeStreamUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    baselineOffset?: IntFieldUpdateOperationsInput | number
    avgLatency?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: CommentaryEventUncheckedUpdateManyWithoutCommentaryNestedInput
  }

  export type UserUpsertWithoutSyncReportsInput = {
    update: XOR<UserUpdateWithoutSyncReportsInput, UserUncheckedUpdateWithoutSyncReportsInput>
    create: XOR<UserCreateWithoutSyncReportsInput, UserUncheckedCreateWithoutSyncReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSyncReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSyncReportsInput, UserUncheckedUpdateWithoutSyncReportsInput>
  }

  export type UserUpdateWithoutSyncReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isCommentator?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commentaries?: CommentaryUpdateManyWithoutCommentatorNestedInput
  }

  export type UserUncheckedUpdateWithoutSyncReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isCommentator?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commentaries?: CommentaryUncheckedUpdateManyWithoutCommentatorNestedInput
  }

  export type CommentaryCreateManyCommentatorInput = {
    id?: string
    matchId: string
    title: string
    description?: string | null
    audioUrl?: string | null
    duration?: number
    youtubeStreamUrl?: string | null
    youtubeStreamId?: string | null
    status?: string
    language?: string
    baselineOffset?: number
    avgLatency?: number
    viewCount?: number
    rating?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SyncReportCreateManyUserInput = {
    id?: string
    commentaryId: string
    reportedOffset: number
    userAgent?: string | null
    streamPlatform?: string | null
    createdAt?: Date | string
  }

  export type CommentaryUpdateWithoutCommentatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: IntFieldUpdateOperationsInput | number
    youtubeStreamUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    baselineOffset?: IntFieldUpdateOperationsInput | number
    avgLatency?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutCommentariesNestedInput
    events?: CommentaryEventUpdateManyWithoutCommentaryNestedInput
    syncReports?: SyncReportUpdateManyWithoutCommentaryNestedInput
  }

  export type CommentaryUncheckedUpdateWithoutCommentatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: IntFieldUpdateOperationsInput | number
    youtubeStreamUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    baselineOffset?: IntFieldUpdateOperationsInput | number
    avgLatency?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: CommentaryEventUncheckedUpdateManyWithoutCommentaryNestedInput
    syncReports?: SyncReportUncheckedUpdateManyWithoutCommentaryNestedInput
  }

  export type CommentaryUncheckedUpdateManyWithoutCommentatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: IntFieldUpdateOperationsInput | number
    youtubeStreamUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    baselineOffset?: IntFieldUpdateOperationsInput | number
    avgLatency?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncReportUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportedOffset?: IntFieldUpdateOperationsInput | number
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    streamPlatform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commentary?: CommentaryUpdateOneRequiredWithoutSyncReportsNestedInput
  }

  export type SyncReportUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentaryId?: StringFieldUpdateOperationsInput | string
    reportedOffset?: IntFieldUpdateOperationsInput | number
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    streamPlatform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncReportUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentaryId?: StringFieldUpdateOperationsInput | string
    reportedOffset?: IntFieldUpdateOperationsInput | number
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    streamPlatform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentaryCreateManyMatchInput = {
    id?: string
    commentatorId: string
    title: string
    description?: string | null
    audioUrl?: string | null
    duration?: number
    youtubeStreamUrl?: string | null
    youtubeStreamId?: string | null
    status?: string
    language?: string
    baselineOffset?: number
    avgLatency?: number
    viewCount?: number
    rating?: number
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchEventCreateManyMatchInput = {
    id?: string
    type: string
    team?: string | null
    player?: string | null
    minute: number
    timestamp: Date | string
    description?: string | null
    createdAt?: Date | string
  }

  export type CommentaryUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: IntFieldUpdateOperationsInput | number
    youtubeStreamUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    baselineOffset?: IntFieldUpdateOperationsInput | number
    avgLatency?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commentator?: UserUpdateOneRequiredWithoutCommentariesNestedInput
    events?: CommentaryEventUpdateManyWithoutCommentaryNestedInput
    syncReports?: SyncReportUpdateManyWithoutCommentaryNestedInput
  }

  export type CommentaryUncheckedUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: IntFieldUpdateOperationsInput | number
    youtubeStreamUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    baselineOffset?: IntFieldUpdateOperationsInput | number
    avgLatency?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: CommentaryEventUncheckedUpdateManyWithoutCommentaryNestedInput
    syncReports?: SyncReportUncheckedUpdateManyWithoutCommentaryNestedInput
  }

  export type CommentaryUncheckedUpdateManyWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentatorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: IntFieldUpdateOperationsInput | number
    youtubeStreamUrl?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    baselineOffset?: IntFieldUpdateOperationsInput | number
    avgLatency?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchEventUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    team?: NullableStringFieldUpdateOperationsInput | string | null
    player?: NullableStringFieldUpdateOperationsInput | string | null
    minute?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchEventUncheckedUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    team?: NullableStringFieldUpdateOperationsInput | string | null
    player?: NullableStringFieldUpdateOperationsInput | string | null
    minute?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchEventUncheckedUpdateManyWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    team?: NullableStringFieldUpdateOperationsInput | string | null
    player?: NullableStringFieldUpdateOperationsInput | string | null
    minute?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentaryEventCreateManyCommentaryInput = {
    id?: string
    type: string
    gameMinute: number
    audioTimestamp: number
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type SyncReportCreateManyCommentaryInput = {
    id?: string
    userId?: string | null
    reportedOffset: number
    userAgent?: string | null
    streamPlatform?: string | null
    createdAt?: Date | string
  }

  export type CommentaryEventUpdateWithoutCommentaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    gameMinute?: IntFieldUpdateOperationsInput | number
    audioTimestamp?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentaryEventUncheckedUpdateWithoutCommentaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    gameMinute?: IntFieldUpdateOperationsInput | number
    audioTimestamp?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentaryEventUncheckedUpdateManyWithoutCommentaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    gameMinute?: IntFieldUpdateOperationsInput | number
    audioTimestamp?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncReportUpdateWithoutCommentaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportedOffset?: IntFieldUpdateOperationsInput | number
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    streamPlatform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutSyncReportsNestedInput
  }

  export type SyncReportUncheckedUpdateWithoutCommentaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    reportedOffset?: IntFieldUpdateOperationsInput | number
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    streamPlatform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncReportUncheckedUpdateManyWithoutCommentaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    reportedOffset?: IntFieldUpdateOperationsInput | number
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    streamPlatform?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}