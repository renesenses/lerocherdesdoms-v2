# Audit Technique — lerocherdesdoms.org

**Date :** 13 février 2026
**Site :** https://www.lerocherdesdoms.org/
**CMS :** WordPress 6.7.4 — Thème Danni v1.0.2 (WiThemes)
**Plugins détectés :** Yoast SEO, Contact Form 7, Lightbox 2, Newsletter, Akismet, Wordfence

---

## Score Global

| Catégorie | Note | Résumé |
|-----------|------|--------|
| **SEO** | 35/100 | Meta description absente, pas d'Open Graph, robots.txt vide, URLs non optimisées |
| **Performance** | 3/10 | TTFB ~849ms, 29+ fichiers JS/CSS, images >2Mo, pas de cache, HTTP/1.1 |
| **Sécurité** | 2/10 | Aucun en-tête de sécurité, contenu mixte HTTP/HTTPS, fichiers sensibles exposés |
| **Mobile** | 1/10 | Pas de meta viewport, pas de menu hamburger, 1 seul breakpoint CSS |
| **Accessibilité** | 2/10 | Pas de skip nav, pas d'ARIA, images sans alt, contraste insuffisant |
| **Navigation/UX** | 3/10 | Architecture blog inadaptée, 48 pages de pagination, pas de CTA, pas de billetterie |

---

## 1. SEO

### Problèmes critiques
- **Aucune meta description** sur les pages — Google choisit un extrait arbitraire
- **Aucune balise Open Graph ni Twitter Card** — partages sociaux sans aperçu
- **Aucune balise canonical** — risque de contenu dupliqué
- **Robots.txt vide** — pas de directive, pas de lien vers le sitemap
- **URLs HTTP dans le sitemap index** au lieu de HTTPS
- **Deux balises H1** sur la page d'accueil (doublon)
- **48 pages de pagination** — contenu profond inaccessible aux robots
- **URLs non descriptives** (ex: `/a-venir-6-84` pour Le Médecin Volant)

### Données structurées
- Yoast génère du JSON-LD basique (CollectionPage, BreadcrumbList, Organization)
- **Manque** : `PerformingGroup`, `Event` (spectacles), `Course` (école de théâtre)
- Logo déclaré trop petit (590x70px) — Google recommande min. 112x112px carré

### Images
- **~55% des images sans texte alternatif** (violation WCAG 1.1.1)
- Alt du logo = "Logo" — trop générique

---

## 2. Performance

### Temps de réponse
- **TTFB : ~849ms** (recommandation : <200ms)
- **Protocole : HTTP/1.1** — ni HTTP/2 ni HTTP/3

### Ressources chargées (page d'accueil)
- **22 fichiers JavaScript** dont Prototype.js + Scriptaculous (bibliothèques obsolètes)
- **7 fichiers CSS** dont le style du thème : 148 Ko non minifié
- ~50% des fichiers JS/CSS ne sont pas minifiés

### Images
| Image | Poids | Problème |
|-------|-------|----------|
| `20230918_193300-scaled.jpg` | **1,72 Mo** | Beaucoup trop lourd |
| `Petit-bonnet-rouge-Affiche-ok-A4-copie-scaled.jpg` | **2,22 Mo** | Beaucoup trop lourd |
- **Aucune image WebP/AVIF** — tout en JPEG/PNG/GIF
- **Pas de lazy loading** (`loading="lazy"`)

### Cache
- **Aucun en-tête de cache** configuré (pas de `Cache-Control`, `Expires`, `ETag`)

---

## 3. Sécurité

### Contenu mixte (CRITIQUE)
- **14 ressources HTTP** chargées sur page HTTPS, dont :
  - Logo et fond pointant vers `http://dev.lerocherdesdoms.org` (domaine de dev !)
  - `lightbox.js` en HTTP — **bloqué par les navigateurs modernes**
  - Plusieurs images et PDFs en HTTP

### En-têtes de sécurité — TOUS ABSENTS
| En-tête manquant | Risque |
|-------------------|--------|
| `X-Frame-Options` | Clickjacking |
| `Content-Security-Policy` | Injection de contenu |
| `X-Content-Type-Options` | MIME-sniffing |
| `Strict-Transport-Security` | Downgrade HTTPS |
| `Referrer-Policy` | Fuite de données |
| `Permissions-Policy` | Accès caméra/micro/géoloc |

### Fichiers sensibles exposés
- `/readme.html` accessible (expose WordPress 6.7.4)
- `/xmlrpc.php` accessible (vecteur de brute force)
- `/wp-json/` expose les plugins installés (Wordfence, Akismet, Yoast)
- Balise `<meta name="generator">` expose la version WordPress

---

## 4. Mobile / Responsive

### Problèmes critiques
- **Aucune balise `<meta name="viewport">`** — le site ne s'adapte pas du tout aux mobiles
- **Aucun menu hamburger** — navigation inaccessible sur téléphone
- **1 seule media query** dans tout le CSS (uniquement pour les flèches du carrousel à 860px)
- **Logo en largeur fixe 1170px** — déborde du conteneur
- Colonnes côte à côte sans réorganisation verticale sur petit écran

### Cibles tactiles insuffisantes
| Élément | Taille | Minimum recommandé |
|---------|--------|---------------------|
| Icônes sociales | 26x24px | 44x44px |
| Pagination slider | 11x11px | 44x44px |

---

## 5. Accessibilité (WCAG 2.1)

### Non-conformités niveau A (critiques)
- Pas de lien d'évitement ("Skip to content")
- Aucun attribut ARIA ni rôle sémantique (`role="navigation"`, `role="main"`, etc.)
- Pas de balises HTML5 sémantiques (`<main>`, `<article>`, `<section>`, `<aside>`)
- Images informatives sans `alt`
- Attribut `lang="fr"` potentiellement absent sur `<html>`
- Focus supprimé sur les galeries (`.gallery-item a:focus { outline: none }`)

### Non-conformités niveau AA
- **Contraste insuffisant des liens** : orange `#d50` sur blanc = ratio ~3.5:1 (minimum requis : 4.5:1)
- Tailles de police non adaptées au mobile (h1 à 48px, champs formulaire à 13px)

---

## 6. Navigation & Architecture

### Structure actuelle (problématique)
Le site est construit comme un **blog WordPress** avec des catégories, pas comme un site vitrine de compagnie de théâtre :
- 48 pages de pagination sur l'accueil
- Spectacles, archives, ateliers = simples catégories d'articles
- Pas de page "La Compagnie" / "Qui sommes-nous"
- Le Contact n'est accessible que depuis le footer
- "Calendrier/Billetterie" n'offre **aucune billetterie réelle**

### Menu actuel
```
Accueil | Calendrier/Billetterie | Actualités (3 sous-menus) | Archives (10 sous-menus!)
Articles de Presse | L'Équipe | Ateliers (1 sous-menu) | Spectacles en tournée (3 sous-menus)
```

### Navigation proposée
```
LA COMPAGNIE           SPECTACLES              ÉCOLE DE THÉÂTRE     CALENDRIER        ACTUALITÉS     CONTACT
├── Notre histoire     ├── En tournée          ├── Cours enfants    (avec liens       ├── Nouvelles
├── L'équipe           │   ├── Le Chasseur…    ├── Cours ados        de réservation)  └── Presse
└── Partenaires        │   ├── Le Médecin…     ├── Cours adultes
                       │   └── Le Petit…       └── Inscriptions
                       └── Archives
```

### Manques identifiés
- **Pas de CTA visible** sur la page d'accueil ("Réserver", "Voir les dates")
- **Pas de page Professionnels/Diffusion** (fiches techniques, conditions, dossiers de presse)
- **Pas de galerie photos** dédiée et organisée par spectacle
- **Pas de vidéos** sur la page d'accueil (teasers des spectacles)
- **Un seul réseau social** (Facebook) — pas d'Instagram ni YouTube
- Vignettes en 150x150px sur l'accueil — aspect non professionnel

---

## 7. Plan d'action recommandé

### Phase 1 — Corrections urgentes (si on garde WordPress)
1. Corriger le contenu mixte HTTP/HTTPS (remplacer `http://dev.lerocherdesdoms.org` et `http://www.lerocherdesdoms.org` par `https://www.lerocherdesdoms.org`)
2. Ajouter la balise `<meta name="viewport">`
3. Compléter le robots.txt
4. Ajouter les meta descriptions via Yoast SEO
5. Masquer la version WordPress et bloquer xmlrpc.php / readme.html
6. Ajouter les en-têtes de sécurité dans .htaccess

### Phase 2 — Refonte recommandée (nouveau site)
Étant donné l'ampleur des problèmes (thème abandonné, pas de responsive, architecture inadaptée, performance médiocre), **une refonte complète est fortement recommandée** plutôt que de patcher un thème obsolète.

Objectifs de la refonte :
- Design moderne et responsive (mobile-first)
- Navigation claire orientée utilisateur
- Billetterie intégrée
- Images optimisées (WebP, lazy loading)
- SEO structuré (Open Graph, Schema.org Event/PerformingGroup)
- Accessibilité WCAG 2.1 AA
- Performance optimale (score Lighthouse > 90)
