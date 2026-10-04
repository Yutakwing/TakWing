# Website synchronisation and application readiness — 4 October 2026

## Reconciliation

The published main branch (`8fbc8ae`) was 28 commits ahead of the old
`personal-blog` checkout (`9439ace`). A second clean checkout, `blog-ii-release`,
already contained the published version. The older directory was not published
over main.

Before updating, all 238 modified/untracked paths were preserved in a named Git
stash and a separate local archive with a binary patch and manifest, outside the
repository. Of these paths, 27 already matched main, 210 differed (principally
older generated pages and superseded source/documentation), and one was a new
October review report. Newer Writing, accessibility, analytics, profile and talks
corrections were retained. The October report was restored; the earlier contact
test history was incorporated into the corrected contact documentation.

Local recovery location: `../website-sync-backups/2026-10-04/`.
Stash label: `Preserved local drafts before October 4 website synchronisation`.
Do not apply this stash wholesale over the newer site. It contains old versions
of files that now have additional published improvements.

## Improvements in this release

- Traditional/Simplified Chinese Skills Lab catalogue and access guidance, plus
  shared keyboard-bypass, footer login/privacy, academic-profile and contact
  fallback text. Activity destinations and recording behaviour are unchanged.
- About now gives a clear route to request a current CV alongside the academic
  profiles, without suggesting a nonexistent PDF download.
- The speaking archive shows populated categories only. Both source-backed
  records, including the corrected IPCRF date and role, are preserved.
- Fixed Media's intrinsic grid width: the 640-pixel video could force horizontal
  overflow on a 390-pixel screen. The grid now permits shrinking to the viewport;
  the stylesheet URL is versioned for this correction.
- Corrected stale contact-delivery documentation: the owner confirmed receipt of
  the earlier post-activation test. No new message was sent in this follow-up.

Changes belong in the generator and source modules; generated pages and search
indexes were rebuilt. Student, Worker, D1, tutor and game scoring sources are
unchanged. No production result writes, migrations or new credentials.

## Application priorities before 8 October

1. **Provide the current CV PDF and the job advert/selection criteria.** There is
   no approved current CV file in the repository. The website can be tailored to
   the role after these are supplied; qualifications or achievements must not be
   invented. Do not publish private referee details or an unreviewed CV.
2. **Complete remaining presentation evidence if relevant to the application.**
   The Pan-Pacific formal title/session and personal roles in the SAHK and
   outreach activities remain incomplete. See `TALKS-VERIFICATION-QUEUE.md`.
3. **Remaining Chinese editorial translations.** The new public interface work
   does not finish Writing collections, selected newer articles, Media/teaching
   additions, Privacy or the Mobility overview. Their English-content notices
   remain accurate. English is currently the most complete application route.
4. **Future teaching-resource development.** Proposed educator downloads and six
   Mobility activities remain marked in development. Release requires verified
   content and review of the clinical/scoring specifications; these are not
   broken live activities.
5. **Optional later improvements.** Measure and consider lazy search loading and
   responsive images; inspect Search Console indexing and optional Zapier result
   forwarding in their respective accounts. Neither is proved by a page check.

The current university profile was checked on 4 October and supports the Senior
Lecturer role, listed degree years and 2026 teaching award:
https://www.sfu.edu.hk/en/about-the-institute/schools-and-departments/school-of-health-sciences/academic-staff/dr-yu-tak-wing/index.html
This is not a fresh verification of every publication, registration or talk.

## Verification

- Structural audit: 218 HTML files, three search indexes and 47 posts per locale.
- 141 article bodies/URLs/SEO records, feeds and sitemap preserved; Writing,
  academic profile and analytics-boundary regression suites pass.
- 80 public page/theme/viewport checks; 42 application-facing page/language/size
  checks, including keyboard bypass, preserved talks and responsive video.
- 24 Skills Lab locale/viewport/theme cases, all 15 activity paths and keyboard
  access to student login passed. One immediate menu-state assertion was
  intermittent during concurrent browser runs; the complete standalone rerun
  passed, as had the earlier run's menu checks.
- Six contact-form cases passed with intercepted responses; failure retains the
  draft, accepted submissions clear it. These tests send no actual email.
- All 13 backend tests pass, including authentication, result isolation,
  duplicate/concurrent submission, safe migration and optional webhook failure.
- Mobility remains inert, unregistered and protected by null verification config.
- Repeated generation is byte-identical; syntax and whitespace checks pass.

External services are intercepted in UI tests. Earlier October live review
covered authenticated layouts and read-only progress access; no fresh full
completion of every game, AI reply, inbox delivery, private account setup or
real iOS/Safari run is claimed. See `WEBSITE-REVIEW-2026-10-04.md` for that review.

Publication is verified separately after the release; local tests alone do not
establish successful GitHub Pages deployment.
