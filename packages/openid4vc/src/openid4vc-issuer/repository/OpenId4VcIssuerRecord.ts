import type { RecordTags, TagsBase } from '@credo-ts/core'

import { BaseRecord, utils } from '@credo-ts/core'

import { type OpenId4VciCredentialSupportedWithId, type OpenId4VciIssuerMetadataDisplay } from '../../shared'

export type OpenId4VcIssuerRecordTags = RecordTags<OpenId4VcIssuerRecord>

export type DefaultOpenId4VcIssuerRecordTags = {
  issuerId: string
}

export interface OpenId4VcIssuerRecordProps {
  id?: string
  createdAt?: Date
  tags?: TagsBase

  issuerId: string

  /**
   * The fingerprint (multibase encoded) of the public key used to sign access tokens for
   * this issuer.
   */
  accessTokenPublicKeyFingerprint: string

  credentialsSupported: OpenId4VciCredentialSupportedWithId[]
  display?: OpenId4VciIssuerMetadataDisplay[]
}

/**
 * For OID4VC you need to expos metadata files. Each issuer needs to host this metadata. This is not the case for DIDComm where we can just have one /didcomm endpoint.
 * So we create a record per openid issuer/verifier that you want, and each tenant can create multiple issuers/verifiers which have different endpoints
 * and metadata files
 * */
export class OpenId4VcIssuerRecord extends BaseRecord<DefaultOpenId4VcIssuerRecordTags> {
  public static readonly type = 'OpenId4VcIssuerRecord'
  public readonly type = OpenId4VcIssuerRecord.type

  public issuerId!: string
  public accessTokenPublicKeyFingerprint!: string

  public credentialsSupported!: OpenId4VciCredentialSupportedWithId[]
  public display?: OpenId4VciIssuerMetadataDisplay[]

  public constructor(props: OpenId4VcIssuerRecordProps) {
    super()

    if (props) {
      this.id = props.id ?? utils.uuid()
      this.createdAt = props.createdAt ?? new Date()
      this._tags = props.tags ?? {}

      this.issuerId = props.issuerId
      this.accessTokenPublicKeyFingerprint = props.accessTokenPublicKeyFingerprint
      this.credentialsSupported = props.credentialsSupported

      this.display = props.display
    }
  }

  public getTags() {
    return {
      ...this._tags,
      issuerId: this.issuerId,
    }
  }
}
