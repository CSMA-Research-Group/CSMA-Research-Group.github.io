# 三位成员肖像处理记录

日期：2026-10-29。

用户要求照片更自然、亲和，避免过于古板的证件照观感。按此要求使用内置 imagegen 对三张用户提供的原照进行编辑，网站使用编辑后的新文件。原照保持不变，未使用生成肖像替代未知成员。成图经目视对照，并在成员卡片和个人页检查。

## Shiyu Zhou

- 原照：`Shiyu_ZHOU.png`，保留不变。
- 网站成图：`public/people/shiyu-zhou.png`，1254 × 1254。
- 方式：内置 imagegen；以本人原照为编辑目标，每人单独处理。
- 调整：轻微闭口微笑、放松表情、柔和光线及浅灰背景、简洁开领衬衫。
- 约束：保留五官比例、年龄、发型、肤色及个人特征；保留原有眼镜或面部毛发，不添加学校标志、背景文字或道具。

完整提示词：

```text
Use case: identity-preserve. Asset type: a real student member portrait on a serious academic research-group website.
Input image: the supplied photograph is the sole edit target and identity reference. Make a restrained photographic edit of THIS SAME PERSON, not a new person.
Primary request: make the portrait feel natural, approachable and relaxed instead of a stern formal ID photo. Give him only a gentle, believable closed-mouth smile and relaxed brow and shoulders. Keep his gaze towards the camera. Preserve his exact facial proportions, individual eye shape and spacing, nose, lips, jawline, ears, age, hairstyle, hairline, skin tone and natural skin texture. Preserve any existing eyeglasses exactly, including frame shape; do not add glasses to someone without them. Preserve any visible facial hair. Do not beautify, slim or reshape the face, remove identifying details, over-whiten skin, enlarge eyes or make him look older. A subtle expression change is enough; no grin and no visible teeth.
Framing: head-and-shoulders portrait, straight-on with a natural posture, square canvas, enough clear space above the whole hairstyle, shoulders and upper chest visible. Match the real person's head and body proportions. His face should remain easily recognizable in a small profile thumbnail.
Lighting and backdrop: soft daylight, gentle warm-neutral light-gray studio background, clear but natural skin texture, even exposure, no dramatic shadows or glossy beauty retouching. Modern and calm, appropriate for a university lab team page.
Avoid: any text, logos, watermark, badges, fake institutional setting, scenery, props, other people, exaggerated pose or emotion.
Clothing: replace the formal black suit and tie with a light blue open-collar oxford shirt, without a tie or suit jacket.
```

## Junchen LU

- 原照：`Junchen_LU.png`，保留不变。
- 网站成图：`public/people/junchen-lu.png`，1254 × 1254。
- 方式：内置 imagegen；以本人原照为编辑目标，每人单独处理。
- 调整：轻微闭口微笑、放松表情、柔和光线及浅灰背景、简洁开领衬衫。
- 约束：保留五官比例、年龄、发型、肤色及个人特征；保留原有眼镜或面部毛发，不添加学校标志、背景文字或道具。

完整提示词：

```text
Use case: identity-preserve. Asset type: a real student member portrait on a serious academic research-group website.
Input image: the supplied photograph is the sole edit target and identity reference. Make a restrained photographic edit of THIS SAME PERSON, not a new person.
Primary request: make the portrait feel natural, approachable and relaxed instead of a stern formal ID photo. Give him only a gentle, believable closed-mouth smile and relaxed brow and shoulders. Keep his gaze towards the camera. Preserve his exact facial proportions, individual eye shape and spacing, nose, lips, jawline, ears, age, hairstyle, hairline, skin tone and natural skin texture. Preserve any existing eyeglasses exactly, including frame shape; do not add glasses to someone without them. Preserve any visible facial hair. Do not beautify, slim or reshape the face, remove identifying details, over-whiten skin, enlarge eyes or make him look older. A subtle expression change is enough; no grin and no visible teeth.
Framing: head-and-shoulders portrait, straight-on with a natural posture, square canvas, enough clear space above the whole hairstyle, shoulders and upper chest visible. Match the real person's head and body proportions. His face should remain easily recognizable in a small profile thumbnail.
Lighting and backdrop: soft daylight, gentle warm-neutral light-gray studio background, clear but natural skin texture, even exposure, no dramatic shadows or glossy beauty retouching. Modern and calm, appropriate for a university lab team page.
Avoid: any text, logos, watermark, badges, fake institutional setting, scenery, props, other people, exaggerated pose or emotion.
Clothing: replace the formal black suit and tie with a muted slate-blue open-collar shirt, without a tie or suit jacket.
```

## Juntong OU

- 原照：`Juntong_OU.png`，保留不变。
- 网站成图：`public/people/juntong-ou.png`，1254 × 1254。
- 方式：内置 imagegen；以本人原照为编辑目标，每人单独处理。
- 调整：轻微闭口微笑、放松表情、柔和光线及浅灰背景、简洁开领衬衫。
- 约束：保留五官比例、年龄、发型、肤色及个人特征；保留原有眼镜或面部毛发，不添加学校标志、背景文字或道具。

完整提示词：

```text
Use case: identity-preserve. Asset type: a real student member portrait on a serious academic research-group website.
Input image: the supplied photograph is the sole edit target and identity reference. Make a restrained photographic edit of THIS SAME PERSON, not a new person.
Primary request: make the portrait feel natural, approachable and relaxed instead of a stern formal ID photo. Give him only a gentle, believable closed-mouth smile and relaxed brow and shoulders. Keep his gaze towards the camera. Preserve his exact facial proportions, individual eye shape and spacing, nose, lips, jawline, ears, age, hairstyle, hairline, skin tone and natural skin texture. Preserve any existing eyeglasses exactly, including frame shape; do not add glasses to someone without them. Preserve any visible facial hair. Do not beautify, slim or reshape the face, remove identifying details, over-whiten skin, enlarge eyes or make him look older. A subtle expression change is enough; no grin and no visible teeth.
Framing: head-and-shoulders portrait, straight-on with a natural posture, square canvas, enough clear space above the whole hairstyle, shoulders and upper chest visible. Match the real person's head and body proportions. His face should remain easily recognizable in a small profile thumbnail.
Lighting and backdrop: soft daylight, gentle warm-neutral light-gray studio background, clear but natural skin texture, even exposure, no dramatic shadows or glossy beauty retouching. Modern and calm, appropriate for a university lab team page.
Avoid: any text, logos, watermark, badges, fake institutional setting, scenery, props, other people, exaggerated pose or emotion.
Clothing: replace the formal black suit and tie with a light blue-gray open-collar shirt, without a tie or suit jacket.
```


## 文件校验

- shiyu-zhou 原照 SHA-256：`32d59cda81134ecce4aa4d5973fbb3cee7f2d61b7efe596e91110363e8c430d8`。
- shiyu-zhou 成图 SHA-256：`f7d6b836fad71c68df03bcfa0ce5183be8fc471a1c26086d7597dd359130678e`。
- junchen-lu 原照 SHA-256：`0a10ecce92d55b08a8b076b55011160b9c6751cdb0c0fe6c6cd6e448fcd4837b`。
- junchen-lu 成图 SHA-256：`2661aaa71ebb1508e4a48f8d37ecbc7de452239380844d85e7e68fdc1f8ae948`。
- juntong-ou 原照 SHA-256：`d5eeea880f30ddc33c28d359f8dc45f6c08913aad5d4937ed11b3259b7c4eb18`。
- juntong-ou 成图 SHA-256：`34fa919dcce75b90c8061e46d98865c7ada80b13d7f563414a24c89d301c6a20`。
