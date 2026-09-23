import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'

export default function EducationCard({ item, index }) {
  const [isCertificateOpen, setIsCertificateOpen] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  const previewPages = useMemo(() => item.previewPages ?? [item.previewImage], [item.previewImage, item.previewPages])
  const currentPreview = previewPages[previewIndex] ?? previewPages[0]

  const handleScrollCertificate = (event) => {
    if (previewPages.length <= 1) return

    const delta = event.deltaY || event.wheelDelta || 0

    if (delta > 0 && previewIndex < previewPages.length - 1) {
      setPreviewIndex((previous) => previous + 1)
    }

    if (delta < 0 && previewIndex > 0) {
      setPreviewIndex((previous) => previous - 1)
    }
  }

  return <>
    <motion.article className="education-card" initial={reduceMotion ? false : { opacity: 0, x: 24, y: 28, rotateY: index % 2 ? 7 : -7, rotateX: 5, scale: .94 }} whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, rotateY: 0, rotateX: 0, scale: 1 }} viewport={{ once: true, margin: '-70px' }} transition={reduceMotion ? { duration: 0 } : { delay: index * .16, duration: .78, ease: [0.22, 1, 0.36, 1] }} whileHover={reduceMotion ? undefined : { y: -9, rotateX: 2, rotateY: index % 2 ? -2 : 2, scale: 1.015 }}>
      <div className="education-card-top"><span>0{index + 1}</span><span>{item.duration}</span></div>
      {item.badge && <span className="education-badge">{item.badge}</span>}
      <a className="education-institution" href={item.institutionUrl} target="_blank" rel="noopener noreferrer">{item.institution}</a>
      <h3>{item.qualificationUrl ? <a href={item.qualificationUrl} target="_blank" rel="noopener noreferrer">{item.qualification}</a> : item.qualification}</h3>
      <p>{item.universityUrl ? <>{item.description.split('London Metropolitan University (UK)')[0]}<a href={item.universityUrl} target="_blank" rel="noopener noreferrer">London Metropolitan University (UK)</a>.</> : item.description}</p>
      {item.certificateUrl && (
        <button type="button" className="education-certificate" onClick={() => { setPreviewIndex(0); setIsCertificateOpen(true) }}>
          View certificate
        </button>
      )}
    </motion.article>

    <AnimatePresence>
      {isCertificateOpen && currentPreview && (
        <motion.div className="certificate-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCertificateOpen(false)}>
          <motion.div className="certificate-modal" initial={{ opacity: 0, y: 28, rotateX: 52, scale: 0.92 }} animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }} exit={{ opacity: 0, y: 18, rotateX: 42, scale: 0.96 }} transition={{ type: 'spring', stiffness: 220, damping: 22 }} onClick={(event) => event.stopPropagation()}>
            <button type="button" className="certificate-modal-close" aria-label="Close certificate" onClick={() => setIsCertificateOpen(false)}>×</button>

            <div className="certificate-modal-header">
              <span className="education-badge">Certification</span>
              <h4>{item.qualification}</h4>
            </div>

            <div className="certificate-frame" onWheel={handleScrollCertificate}>
              <motion.img
                key={currentPreview}
                src={currentPreview}
                alt={`${item.qualification} certificate page ${previewIndex + 1}`}
                className="certificate-preview-image"
                initial={{ opacity: 0, x: previewIndex > 0 ? 18 : -18, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: previewIndex > 0 ? -18 : 18, scale: 0.985 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              />
            </div>

            {previewPages.length > 1 && (
              <div className="certificate-page-controls">
                <button type="button" className="button button--ghost" onClick={() => setPreviewIndex((previous) => Math.max(previous - 1, 0))} disabled={previewIndex === 0}>Previous</button>
                <span>{previewIndex + 1} / {previewPages.length}</span>
                <button type="button" className="button button--ghost" onClick={() => setPreviewIndex((previous) => Math.min(previous + 1, previewPages.length - 1))} disabled={previewIndex === previewPages.length - 1}>Next</button>
              </div>
            )}

            <div className="certificate-modal-actions">
              <a href={item.certificateUrl} target="_blank" rel="noopener noreferrer" className="button button--primary">Open PDF</a>
              <button type="button" className="button button--ghost" onClick={() => setIsCertificateOpen(false)}>Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
}
