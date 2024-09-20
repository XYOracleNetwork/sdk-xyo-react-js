export interface ShareLinkProps {
  copiedLinkText?: string
  copyLinkText?: string
  shareLinkName?: string
  shareUrl?: string
  uploadPayloads?: () => Promise<void>
  xnsName?: string
}
