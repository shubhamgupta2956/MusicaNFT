import { Connection, PublicKey } from '@solana/web3.js';
import * as borsh from 'borsh';

export function makeid(length: number): string {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function underscoreGenerator(length: number): string {
  var result = '';
  var characters = '_';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function stringConcat(input: string, length: number): string {
  var u = length - input.length;
  return input + underscoreGenerator(u);
}

export function stringParser(input: string): string {
  var length = input.length;
  for (var i = length - 1; i >= 0; i--) {
    if (input.charAt(i) != '_') {
      break;
    }
  }
  return input.slice(0, i + 1);
}

export class IntellectualProperty {
  property_owner = makeid(44);
  hash = makeid(64);
  value = makeid(5);
  url = makeid(500);
  is_public = makeid(1);
  tracks = makeid(1000);
  constructor(
    fields:
      | {
          property_owner: string;
          hash: string;
          value: string;
          url: string;
          is_public: string;
          tracks: string;
        }
      | undefined = undefined
  ) {
    if (fields) {
      this.property_owner = fields.property_owner;
      this.hash = fields.hash;
      this.value = fields.value;
      this.url = fields.url;
      this.is_public = fields.is_public;
      this.tracks = fields.tracks;
    }
  }
}

export function parseIntellectualProperty(
  property: IntellectualProperty
): IntellectualProperty {
  property.url = stringParser(property.url);
  property.value = stringParser(property.value);
  return property;
}

export const IntellectualPropertySchema = new Map([
  [
    IntellectualProperty,
    {
      kind: 'struct',
      fields: [
        ['property_owner', 'string'],
        ['hash', 'string'],
        ['value', 'string'],
        ['url', 'string'],
        ['is_public', 'string'],
        ['tracks', 'string'],
      ],
    },
  ],
]);

export const IntellectualProperty_Size = borsh.serialize(
  IntellectualPropertySchema,
  new IntellectualProperty()
).length;

export const program_id = new PublicKey(
  'DcTedCXg4LH7LGLkgXNBNjmy7jGNxxMwj7JH8YLSpvVQ'
);
const rpcUrl = 'https://api.devnet.solana.com';
export const seed = 'patents4lyf';

export async function fetchNft(key: string) {
  const connection = new Connection(rpcUrl, 'singleGossip');
  var greetedPubkey = new PublicKey(key);
  const accountInfo = await connection.getAccountInfo(greetedPubkey);
  if (accountInfo === null) {
    return {};
  }
  const property = borsh.deserialize(
    IntellectualPropertySchema,
    IntellectualProperty,
    accountInfo.data
  );
  return parseIntellectualProperty(property);
}

export async function sha256(message: string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
