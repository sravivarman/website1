---
title: S. Ravivarman
subtitle: Teaching • Engineering • Technology
---

<div style="padding:3rem 1rem 2rem;text-align:center;max-width:900px;margin:auto;">
  <h1 style="font-size:2.6rem;margin-bottom:.4rem;">S. Ravivarman</h1>
  <p style="font-size:1.1rem;color:#555;">
    Educator in Electrical & Electronics Engineering focused on conceptual clarity,
    real-world systems, and engineering practice.
  </p>

  <div style="margin-top:1.4rem;">
    <a href="/courses/" style="padding:.6rem 1.2rem;border-radius:8px;background:#2563eb;color:#fff;text-decoration:none;">
      View Courses
    </a>
    <a href="/archives/" style="margin-left:.8rem;padding:.6rem 1.2rem;border-radius:8px;border:1px solid #ccc;text-decoration:none;">
      Read Blog
    </a>
  </div>
</div>

<hr>

{{ $currentCourses := where site.RegularPages "Params.current" true }}
{{ if gt (len $currentCourses) 0 }}
<div style="max-width:900px;margin:2rem auto;padding:1.2rem;border-left:6px solid #0ea5e9;background:#ecfeff;border-radius:10px;">
  <strong>{{ (index $currentCourses 0).Params.semester }}</strong><br>
  <span style="font-size:.9rem;color:#444;">Currently active academic term</span>
</div>
{{ end }}

<div style="max-width:1000px;margin:auto;">
  <h2>📘 What You’ll Find Here</h2>

  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.2rem;">
    <div style="padding:1.2rem;border-radius:14px;background:#f0f9ff;">
      <strong>Teaching</strong>
      <p style="font-size:.9rem;">Courses, notes, worked examples, and conceptual explanations.</p>
    </div>

    <div style="padding:1.2rem;border-radius:14px;background:#fff7ed;">
      <strong>Blog</strong>
      <p style="font-size:.9rem;">Engineering topics, classroom insights, and emerging technologies.</p>
    </div>

    <div style="padding:1.2rem;border-radius:14px;background:#fdf4ff;">
      <strong>Research & Practice</strong>
      <p style="font-size:.9rem;">EVs, power electronics, control systems, and applied engineering.</p>
    </div>
  </div>
</div>

<hr>

<div style="max-width:1000px;margin:auto;">
  <h2>🎯 Currently Teaching</h2>

  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;">
    {{ range where site.RegularPages "Params.current" true }}
    <div style="padding:1.2rem;border-radius:14px;background:#f8fafc;box-shadow:0 6px 16px rgba(0,0,0,.06);">
      <strong>{{ .Title }}</strong><br>
      <span style="font-size:.85rem;color:#555;">
        {{ .Params.programme }} • {{ .Params.year }}
      </span>
      <p style="font-size:.9rem;margin-top:.4rem;">
        {{ .Summary }}
      </p>
      <a href="{{ .RelPermalink }}">Course →</a>
    </div>
    {{ end }}
  </div>
</div>

<hr>

<div style="max-width:1000px;margin:auto;">
  <h2>🧠 Teaching at a Glance</h2>

  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;">
    <div style="background:#f0fdf4;padding:1rem;border-radius:12px;">
      <strong>{{ len (where site.RegularPages "Section" "courses") }}</strong><br>
      <span style="font-size:.85rem;">Courses Taught</span>
    </div>

    <div style="background:#fff7ed;padding:1rem;border-radius:12px;">
      <strong>{{ len (where site.RegularPages "Params.current" true) }}</strong><br>
      <span style="font-size:.85rem;">Active Courses</span>
    </div>

    <div style="background:#eef2ff;padding:1rem;border-radius:12px;">
      <strong>{{ len site.RegularPages }}</strong><br>
      <span style="font-size:.85rem;">Total Posts & Notes</span>
    </div>
  </div>
</div>

<hr>

<div style="max-width:1000px;margin:auto;">
  <h2>📰 Recent Blog Posts</h2>

  {{ range first 5 (where site.RegularPages "Params.type" "blog") }}
  <div style="margin-bottom:.8rem;">
    <a href="{{ .RelPermalink }}"><strong>{{ .Title }}</strong></a><br>
    <span style="font-size:.85rem;color:#666;">{{ .Date.Format "02 Jan 2006" }}</span>
  </div>
  {{ end }}

  <a href="/archives/">Browse all posts →</a>
</div>

<hr>

<div style="max-width:1000px;margin:auto;">
  <h2>📒 Recent Class Notes</h2>

  {{ range first 5 (where site.RegularPages "Params.type" "notes") }}
  <div style="margin-bottom:.8rem;">
    <a href="{{ .RelPermalink }}"><strong>{{ .Title }}</strong></a><br>
    <span style="font-size:.85rem;color:#666;">
      {{ index .Params.categories 0 }}
    </span>
  </div>
  {{ end }}

  <a href="/categories/">Explore by topic →</a>
</div>

<hr>

<div style="max-width:800px;margin:3rem auto;text-align:center;font-style:italic;color:#444;">
Conceptual clarity enables engineers to adapt, innovate,  
and work confidently across evolving technologies.
</div>
