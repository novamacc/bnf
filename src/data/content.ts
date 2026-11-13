import type { Content } from './types';

/**
 * English collections. Every fact here comes from bodhinature.com (REST API + rendered HTML,
 * harvested 2026-11-13) or from the project brief (the two current events, the Sweden branch).
 * Where the source has no date, time or address, the field is left out.
 */
const YT = 'https://www.youtube.com/playlist?list=';

export const content: Content = {
  programmes: [
    {
      slug: 'dharma-study',
      title: 'Dharma Study',
      short: 'The Four Noble Truths, impermanence and cause and effect, studied step by step.',
      kicker: 'Learn',
      lead: 'Through studying the truth you will know what to practise and what to avoid.',
      icon: '2024/08/dharma-.png',
      tint: '#EADFC6',
      peek: '2022/07/buddha-1.jpg',
      intro: [
        'Buddhism traces its origins to the teachings of Siddhartha Gautama, who became known as the Buddha, “the awakened one”. Born in ancient India around the sixth century BCE, he renounced a life of luxury to seek enlightenment, and after awakening under the Bodhi tree at Bodh Gaya he spent his life helping others overcome suffering.',
        'At the heart of his teaching are the Four Noble Truths and the Noble Eightfold Path: principles of ethical conduct, mental discipline and wisdom that lead towards Nirvana, liberation from suffering and the cycle of rebirth.',
      ],
      sections: [
        {
          id: 'truths', kicker: 'Foundation', title: 'The Four Noble Truths', ordered: true,
          list: [
            'The truth of suffering. Birth, ageing, sickness and death are suffering; so are separation from the loved, association with the unloved, not getting what one wants, and the five aggregates afflicted by clinging.',
            'The truth of the cause of suffering. Craving — the thirst for forms, feelings, perceptions, volitional formations and consciousness — is the source of suffering.',
            'The truth of the end of suffering. The complete cessation of that craving is the cessation of suffering.',
            'The truth of the path. The only path to the complete elimination of craving is the Noble Eightfold Path.',
          ],
          image: '2022/07/3-suffering.jpg',
        },
        {
          kicker: 'Contemplation', title: 'The three types of suffering',
          body: ['“All conditioned things are suffering” is one of the Four Seals. Yet when we satisfy a desire we clearly feel happy. Was the Buddha mistaken? The series explores what he really meant: the suffering of suffering, the suffering of change, and the suffering of existence itself.'],
          image: '2022/07/reason.jpg',
          links: [{ label: 'Watch the series', href: YT + 'PLdph_MCVJGB3BTeeCdLbCXoWC_qrfELfa' }],
        },
        {
          kicker: 'Impermanence', title: 'All conditioned things are impermanent',
          quote: 'Among all footprints, the footprint of the elephant is the most distinguished; among all perspectives, the perspective of impermanence is the most distinguished.',
          body: ['An elephant never takes a dangerous path, so following its footprints brings you safely home. In the same way, contemplating impermanence is what moves us to practise: when we grow lazy, remembering that life and everything in it passes away rekindles the wish to improve.'],
          image: '2022/07/900-26.jpg',
        },
        {
          kicker: 'Karma', title: 'The law of cause and effect',
          body: [
            'We have free will, but without understanding the truth of the universe and of life, free will acts blindly. The momentum those actions create is called karma; as it accumulates it forms habits, and habits push back on the will as karmic force.',
            'The law of karma — also called the law of dependent arising — has five aspects, explored in the video series.',
          ],
          quote: 'All fortunes and misfortunes arise from the mind. Look inward and you will understand everything. — The Sixth Patriarch',
          image: '2022/07/900-20.jpg',
          links: [{ label: 'Watch: the law of cause and effect', href: YT + 'PLdph_MCVJGB3choe9t5kKWyguvtzkQEJ-' }],
        },
        {
          kicker: 'Cosmology', title: 'Buddhist astronomy',
          body: ['Humanity has always wondered about the universe, life and death, time and space. After his awakening the Buddha understood these questions completely and taught them to his disciples. This series opens the worldview of Buddhist wisdom.'],
          image: '2022/07/900-29.jpg',
          links: [{ label: 'Watch the full series', href: YT + 'PLdph_MCVJGB2PCZWsXqSkt4_eMRDXndJW' }],
        },
      ],
      timetable: {
        title: 'Online dharma classes',
        rows: [
          { when: 'Tuesdays, 20:00–21:00', what: 'English' },
          { when: 'Fridays, 18:00–20:00', what: 'Mandarin' },
        ],
        note: 'Mountain Standard Time. The four seals are taught in order: all compounded things are impermanent; all contaminated things are suffering; all phenomena are empty and devoid of self; nirvana is true peace.',
      },
    },
    {
      slug: 'mindfulness',
      title: 'Mindfulness',
      short: 'Meditation, posture, breath and chanting: present-moment awareness for daily life.',
      kicker: 'Reflect',
      lead: 'You can meditate anytime and anywhere. However noisy the surroundings, peace is available.',
      icon: '2024/08/mindfulness-.png',
      tint: '#E3E6D6',
      peek: '2022/08/buddha-meditation-900-600.png',
      intro: [
        'At the core of mindfulness is present-moment awareness. Through guided meditation, mindful movement and teaching from experienced instructors, we learn to observe thoughts and sensations without judgement. Emotions settle, stress eases, and well-being grows.',
        'The benefits reach beyond the cushion: participants report better concentration, more creativity and more resilience. Mindfulness becomes a tool for daily living.',
      ],
      sections: [
        {
          kicker: 'Before you sit', title: 'Preparation before meditation', ordered: true,
          list: [
            'Choose a quiet place where you will not be disturbed.',
            'Sit on a comfortable cushion or chair, spine upright, relaxed yet alert.',
            'Pick a consistent time: morning, a break, or evening.',
            'Switch off distractions; prepare any guided recording in advance.',
            'Wear loose clothing that lets you move and breathe.',
            'Take a few deep breaths or stretch gently.',
            'Set an intention: less stress, more clarity.',
            'Begin with five to ten minutes and lengthen gradually.',
          ],
          image: '2022/08/meditation-900-600-5-copy.png',
        },
        {
          kicker: 'Posture', title: 'The seven-point posture of Vairochana', ordered: true,
          body: ['An upright spine eases the breath and keeps the mind clear, so you can sit longer and with less strain.'],
          list: [
            'Sit in full or half vajra position, or cross-legged.',
            'Keep the back straight.',
            'Rest the left hand beneath the right, thumbs touching to form a triangle.',
            'Hold the arms slightly away from the body.',
            'Lower the head a little and tuck the chin.',
            'Keep the eyes slightly open, gaze resting at the tip of the nose.',
            'Let the tongue touch the upper palate gently.',
          ],
          image: '2022/07/900-105.jpg',
        },
        {
          kicker: 'Breath', title: 'Counting the breath',
          body: [
            'The easiest way to begin is to count breaths. Each inhale and exhale is one breath: count from one to ten, ten back to one, and one to ten again — a set of thirty.',
            'Meditation practised without proper guidance can do harm. Please contact us for guidance so that your practice stays healthy.',
          ],
          image: '2022/07/900-81.jpg',
        },
        {
          kicker: 'Heart', title: 'The Four Immeasurables',
          list: [
            'Equanimity: meeting every phenomenon, inner and outer, without attachment or aversion.',
            'Loving-kindness: caring for all beings as dearly as our own children.',
            'Compassion: enduring hardship to ease the suffering of those who live in ways that harm them.',
            'Empathetic joy: rejoicing in the happiness and liberation of others.',
          ],
          image: '2022/07/900-65.jpg',
        },
      ],
      practices: {
        title: 'Guided practices',
        items: [
          { title: 'Relaxation for the whole body and mind', image: '2023/04/Relexation.png' },
          { title: 'Relaxing the heart chakra', image: '2023/04/RELAX.png' },
          { title: 'Loving-kindness meditation', image: '2022/07/900-62.jpg' },
          { title: 'Compassionate positive energy', image: '2023/04/possitive-energy.jpg' },
        ],
      },
      timetable: {
        title: 'Online morning and chanting classes',
        rows: [
          { when: '06:00–06:30', what: 'Morning prayers' },
          { when: '06:30–07:00', what: 'Prostration' },
          { when: '07:00–07:30', what: 'Meditation' },
          { when: '17:00–18:00', what: 'Chanting: Mantra of Light, Vajrasattva, Great Compassion, Om Mani Padme Hum' },
        ],
        note: 'Mountain Standard Time.',
      },
      more: [
        { label: 'Practise with the guided meditations', href: 'https://www.youtube.com/watch?v=_6s-uy47WSc&list=PLdph_MCVJGB0GXdmta5qbT96ShikZek2g' },
        { label: 'Mindfulness in Plain English series', href: 'https://youtube.com/playlist?list=PLdph_MCVJGB050U1T9cLdb1o3psnFad-m' },
        { label: 'Chanting playlist', href: 'https://youtube.com/playlist?list=PLp-bkW_-IYjOeAg3lo9hEoVNLuMS58fQr' },
      ],
    },
    {
      slug: 'tai-chi',
      title: 'Tai Chi & Movement',
      short: 'Standing stake, the Lotus practice and Tai Chi steps: mindfulness of the body.',
      kicker: 'Practise',
      lead: 'Tai Chi is the four foundations of mindfulness, practised through the body.',
      icon: '2024/08/taijiquan-.png',
      tint: '#DDE4DF',
      peek: '2022/08/taichi-900-600-4.png',
      intro: [
        'Tai Chi takes the Taiji and Yin–Yang thought of Confucianism and Taoism as its core, and draws together the Five Elements of the I Ching, the meridians of Chinese medicine, ancient Daoyin and Tuna breathing.',
        'Gentle, slow and light, it combines inner and outer cultivation. Its slow, graceful movements help you stretch, breathe and find balance, calming body and emotions and easing stress, anxiety and depression. Practised over years, it opens the channels of qi, strengthens the body and steadies the temperament.',
      ],
      sections: [
        {
          kicker: 'Stillness', title: 'Tai Chi standing stake',
          body: [
            'The longer you stand, the lighter the whole body feels. A slight wobble is normal; do every movement and essential correctly.',
            'Swelling in the legs or tingling in the feet comes because body and mind are at peace: you feel the qi adjusting more clearly. When the mind is scattered you simply do not notice.',
          ],
          image: '2022/08/tai-chi-standing-1-900-508.jpg',
        },
        {
          kicker: 'Awareness', title: 'Mindfulness of Tai Chi',
          body: [
            'The four levels of Tai Chi are mindfulness of the body, of sensations, of mental states and of phenomena — the four foundations taught by the Buddha in the Great Discourse on the Foundations of Mindfulness.',
            'Our body is arising and ceasing moment by moment. Be aware of its motion first, every small muscle. Practise that well, and you are already doing real Tai Chi.',
          ],
          image: '2022/08/taichi-blue.jpg',
        },
      ],
      practices: {
        title: 'Practices',
        items: [
          { title: 'Standing stake 02', text: 'Tai Chi as the four foundations of mindfulness.', image: '2022/08/tai-chi-standing2-900-508.jpg' },
          { title: 'The Lotus practice', text: 'An art embracing mind and body: deep, yet easy to learn, and soon beneficial.', image: '2022/08/lotus-practice.jpg' },
          { title: 'YM simple dynamic practice', text: 'A moving meditation that lets qi flow smoothly and powerfully. Practise twice a day.', image: '2022/11/exercise.jpg' },
          { title: 'Tai Chi steps', text: 'Everything is impermanent; begin with awareness of the body in motion.', image: '2022/08/taichi-06-copy.jpg' },
        ],
      },
      timetable: {
        title: 'Local classes',
        rows: [{ when: 'Fridays, morning and afternoon', what: 'Two free Tai Chi classes in Richmond, open to the public' }],
      },
      more: [
        { label: 'Tai Chi events on YouTube', href: YT + 'PLp-bkW_-IYjM8VZ8I-Kwi8f9N76upieCI' },
      ],
    },
    {
      slug: 'hospice-care',
      title: 'Hospice Care',
      short: 'Facing death without fear, and helping others through the passage with love.',
      kicker: 'Serve',
      lead: 'The state of mind at the end of life matters greatly. Hospice care is the last, and most important, help we can give.',
      icon: '2024/08/hospice-.png',
      tint: '#EFDCCF',
      peek: '2022/08/hospice-care-900-600-4.jpg',
      intro: [
        'Buddhism understands life and death deeply. End-of-life care is approached with compassion and mindfulness: to ease the transition with dignity and spiritual readiness, to cultivate acceptance of impermanence, and to let go of attachments.',
        'Caregivers offer physical comfort and emotional support while helping the dying keep a clear awareness, so that they can depart with serenity, guided by compassion and wisdom.',
      ],
      sections: [
        {
          kicker: 'Principles', title: 'Helping someone tie the loose ends',
          body: [
            'Talk with the one who is passing. Ask: “You are about to move on — is anything still troubling you?” Reassure them: “You don’t need to worry; once the arrangements are made, everything will unfold.” Let them think the arrangements through, and take care of them.',
            'Always speak with great love, kindness and patience. Don’t rush anything, and don’t make it too heavy.',
          ],
          list: [
            'Do not voice grievances in front of them; help them release desire, anger and hatred.',
            'Remind them, again and again, to let go of worldly attachments.',
            'Help them meet death with right thought: a positive, peaceful mind full of respect, love and compassion.',
          ],
          image: '2022/08/hospice-care-900-600-5.jpg',
        },
        {
          kicker: 'Classes', title: 'What the classes teach',
          list: [
            'To explore the truth of life and live fully, without regret.',
            'To be mindful now, and ready for the moment to come.',
            'To let go of the fear of death.',
            'To help yourself and others through the transition between two stages of life.',
          ],
          body: ['Classes run regularly: about two hours a day, twenty-one days per stage, four stages in all. They are currently taught in Chinese only; online attendance is possible.'],
          image: '2022/08/hospice-care-900-600-6.jpg',
        },
        {
          kicker: 'Reading', title: 'The Tibetan Book of Living and Dying',
          body: ['Sogyal Rinpoche’s manual for life and death introduces meditation, the nature of mind, karma and rebirth, compassionate care for the dying, and the trials and rewards of the spiritual path.'],
          image: '2024/07/Tibetan-.png',
          links: [{ label: 'Watch the video series', href: YT + 'PLp-bkW_-IYjPTN39-gAa8GosM7m9V-f95' }],
        },
      ],
      practices: {
        title: 'Practices',
        items: [
          { title: 'Liberation Through Hearing During the Intermediate State', text: 'Begin listening a month or two before the transition; it alternates with chanting the Buddha’s name.', image: '2022/08/hospice-care-900-1.jpg', href: 'https://youtu.be/IJS4SFlJumM' },
          { title: 'Death meditation', image: '2022/08/hospice-care-900-2-scaled.jpg' },
          { title: 'To live until you die', image: '2022/08/hospice-care-900-3.jpg' },
        ],
      },
    },
    {
      slug: 'happiness-freedom',
      title: 'Happiness & Freedom',
      short: 'What true happiness and freedom are, in fifteen talks and a book in four languages.',
      kicker: 'Awaken',
      lead: 'We equate satisfying desire with happiness. Wise voices point to a happiness that outer change cannot touch.',
      icon: '2024/08/happy-fish.png',
      tint: '#E2E4EC',
      peek: '2022/09/happy-kids-scaled.jpg',
      intro: [
        'All beings hustle through life seeking happiness and freedom, yet our understanding of them is often narrow, even mistaken. Many of today’s personal and psychological troubles grow from that misdirected search.',
        'Success brings joy, failure brings sorrow. Yet there is a deeper happiness and freedom that does not depend on circumstance, and it is within reach. These fifteen talks explore it; the text is available as a book in four languages.',
      ],
      sections: [],
      practices: {
        title: 'The Essence of Happiness & True Freedom',
        items: [
          { title: 'Talk 01', image: '2022/07/900-131.jpg' },
          { title: 'Talk 02', image: '2022/07/900-130.jpg' },
          { title: 'Talk 03', image: '2022/07/900-129.jpg' },
          { title: 'Talk 04', image: '2022/09/happy-kids-scaled.jpg' },
          { title: 'Talk 05', image: '2022/07/900-4.jpg' },
          { title: 'Talk 06', image: '2022/07/900-24.jpg' },
          { title: 'Talk 07', image: '2022/09/happy-face-5.jpg' },
          { title: 'Talk 08', image: '2022/09/happy-face-6.jpg' },
          { title: 'Talk 09', image: '2022/09/courtney-cook-5_sGvilNME-unsplash-copy.jpg' },
          { title: 'Talk 10', image: '2022/09/tim-mossholder-rx_GNopVlFs-unsplash-copy.jpg' },
          { title: 'Talk 11', image: '2022/07/900-127.jpg' },
          { title: 'Talk 12', image: '2022/07/900-132.jpg' },
          { title: 'Talk 13', image: '2022/09/happy-face-2.jpg' },
          { title: 'Talk 14', image: '2022/09/happy-face-3.jpg' },
          { title: 'Talk 15', image: '2022/07/900-128.jpg' },
        ],
      },
      books: [
        { lang: 'English', title: 'The Essence of Happiness and True Freedom', cover: '2024/05/195913178.jpeg', read: 'https://bodhinature.com/wp-content/uploads/2024/05/The-Essence-of-Happiness-and-True-Freedom-compressed.pdf', download: 'https://bodhinature.com/download/2509/', readLabel: 'Read online', downloadLabel: 'Download' },
        { lang: 'Deutsch', title: 'Die Essenz von Glück und wahrer Freiheit', cover: '2024/05/Germany-scaled.jpeg', read: 'https://bodhinature.com/wp-content/uploads/2024/05/DE-Die-Essenz-von-Gluck-und-wahrer-Freiheit-1.pdf', download: 'https://bodhinature.com/download/2479/', readLabel: 'Online lesen', downloadLabel: 'Herunterladen' },
        { lang: 'Français', title: 'L’essence du bonheur et de la vraie liberté', cover: '2024/05/fr-scaled.jpeg', read: 'https://bodhinature.com/wp-content/uploads/2024/05/Lessence-du-bonheur-et-de-la-vraie-liberte.pdf', download: 'https://bodhinature.com/download/2494/', readLabel: 'Lire en ligne', downloadLabel: 'Télécharger' },
        { lang: 'Nederlands', title: 'De essentie van geluk en ware vrijheid', cover: '2024/05/e24236a03f760b5-scaled.jpeg', read: 'https://bodhinature.com/wp-content/uploads/2024/05/NL-De-Essentie-van-Geluk-en-Ware-Vrijheid.pdf', download: 'https://bodhinature.com/download/2501/', readLabel: 'Online lezen', downloadLabel: 'Downloaden' },
      ],
    },
  ],

  testimonials: [
    { title: 'I feel how tiny I am', name: 'Qing Ju', role: 'High school teacher', portrait: '2022/05/75x75_auto.png',
      text: 'I had been a teacher for fifteen years, and all I knew of the world were pictures of continents, then Earth, Moon and Mars, then the galaxy. After the course I realised that “world” means time and space. Only then did I feel how tiny I am, and how absurd it is for us to think we know so much.' },
    { title: 'My love for my parents awakened', name: 'Kong Yuan', role: 'Pottery craftsman', portrait: '2022/05/75x75_auto8.png',
      text: 'The teachers awakened my love for my parents. How could we blame them, when repaying what they gave us is so hard? I was deeply remorseful and shed tears. The resentment between my mother and me has eased, and we are closer now. The course taught me how to build a healthy, harmonious family.' },
    { title: 'Love and kindness', name: 'Lei Jun', role: 'Photographer', portrait: '2022/05/75x75_auto6.png',
      text: 'It woke me up to what I had done with the years behind me. What had I given to society? How much time had I wasted? From here on I want to live every present moment, learn from my teachers, and spread love and kindness — let life awaken life.' },
    { title: 'I feel reborn', name: 'Kong Yang', role: 'Spiritual counsellor', portrait: '2022/05/75x75_auto7.png',
      text: 'A free spiritual meal, given by people with great hearts. Without them I would still be living in a muddled ego, unaware how precious this human life is. From this moment I will not live without purpose: kind to every living being, in harmony with my family, in service to society, in pursuit of truth.' },
    { title: 'How should I live?', name: 'Wang Kun', role: 'Painter', portrait: '2022/05/75x75_auto1.png',
      text: 'I had always drifted without clear goals. Today’s lesson on the three sufferings and impermanence showed me that life is the cultivation of the soul. Before I joined this community my life never left the five desires: wealth, sex, fame, food and sleep.' },
  ],

  sayings: [
    { title: 'People who believe in cause and effect', text: 'A person who practises the ten virtuous deeds always harbours benevolent thoughts and holds no malice towards any being, however foolish or vicious. When evil thoughts arise, whatever the reason, they show where our own cultivation falls short.' },
    { title: 'A true bodhisattva', text: 'A true bodhisattva engages in worldly activity without desire or personal preference, simply following the needs of sentient beings, always in harmony with them.' },
    { title: 'When practice feels slow', text: 'Being anxious is useless; it takes time. If you feel slow, listen more. If someone listens once, listen ten times; if they listen ten times, listen a hundred. You will surely catch up.' },
    { title: 'Always reflect on your mind', text: 'Constantly examine your own mind. If your motivation is not wholesome, correct it. Only practice that is pure, for the sake of life and death and the awakening of all beings, leads towards liberation.' },
    { title: 'Knowing the direction of practice', text: 'The direction is simple: break through the confusion and attachments of ignorance. Then our Buddha-nature has great and marvellous uses. We have this capacity too; it is only obstructed by our own afflictions.' },
    { title: 'The attitude for doing things', text: 'Whatever we do, if it reduces affliction, increases joy in the Dharma and upholds the mind of the Dharma, it is perfect. Don’t argue over trifles. Talk calmly, and work together with the humblest attitude.' },
    { title: 'Waiting', text: 'Bodhisattvas hold the lamp of wisdom and wait through the endless night to light our way, patient as parents waiting for their children. One cannot force another to practise. Beings need the right moment; hence the importance of waiting.' },
    { title: 'When others make mistakes', text: 'Guide them, or wait for the moment to persuade them skilfully. When the time is ripe you may reprimand, but blaming at once shows a lack of compassion.' },
    { title: 'Compassion for the one who hurt you', text: 'The person who hurts you is helping you on the bodhisattva path: through them you cultivate compassion and remove the seeds of your own anger. Be grateful — but never wish for harm, for that too would harm beings.' },
    { title: 'When afflictions go, wisdom emerges', text: 'Wisdom is not acquired from outside. It is inherent; as afflictions diminish, it naturally appears. Practice is just that simple.' },
    { title: 'A meditation that deepens compassion', text: 'In the Four Immeasurables, begin with equanimity, letting go of desire and hatred towards beings. Then cultivate loving-kindness, then compassion: positive energy, given outward to all beings.' },
    { title: 'Cultivate positive energy', text: 'Those who practise must stay in continual education: acknowledge our faults, repent of bad habits and thoughts, and expose ourselves to right mindfulness, right awareness, right view — what people now call positive energy.' },
    { title: 'Breaking the ego', text: 'Have you truly observed non-self in meditation, from morning to night? Talking is not enough. Observe too little, and you will find no trace of non-self in daily life.' },
    { title: 'Observing suffering moment by moment', text: 'After contemplating impermanence, observe arising and ceasing moment by moment, not coarsely: how the suffering of suffering and the suffering of change arise and pass. Do not cling; see thoroughly what is moving.' },
  ],

  branches: [
    { id: 'canada', country: 'Canada', cities: 'Richmond · Calgary', phone: '+1 587 890 8888', email: 'peace@bodhinature.com', banner: '2024/03/3-6.png', extra: ['2024/04/Canada-OurTeachers.png', '2024/07/regular-activities1.png'] },
    { id: 'united-states', country: 'United States', cities: 'Los Angeles · Raleigh · New York', phone: '(626) 232-8143', email: 'usa@yimingpureland.org', address: '21030 Blossom Way, Diamond Bar, CA 91765', banner: '2024/03/2-8.png', extra: ['2024/03/America-Branch-teachers-1.png', '2024/03/us-branch-course-2.png'] },
    { id: 'australia', country: 'Australia', cities: 'Sydney', phone: '+61 493 725 853', email: 'lightofpractice@gmail.com', address: '13 Genders Ave, Burwood NSW 2134', banner: '2024/03/1-11.png', extra: ['2024/03/Australia-Branch-Teachers.png'] },
    { id: 'japan', country: 'Japan', cities: 'Osaka · Nara', phone: '+81 80-5088-1594', email: 'jy-519@outlook.com', address: '〒550-0024 大阪府大阪市西区境川1丁目6-26', contact: '嘉阳 (Jiayang)', banner: '2024/04/Japan-.png', extra: ['2024/04/Japan-teachers-1.png', '2024/04/Japan-branch-schedual.png'] },
    { id: 'singapore', country: 'Singapore', phone: '+65 8413 8197', email: 'peace@bodhinature.com', banner: '2024/03/4-2.png', extra: ['2024/03/SCHEDULE-2.png'] },
    { id: 'thailand', country: 'Thailand', cities: 'Bangkok · Chiang Mai · Phuket', extra: ['2024/08/Thailand-2024-activities.jpg'] },
    { id: 'malaysia', country: 'Malaysia', cities: 'Kuala Lumpur · Malacca', extra: ['2024/04/malaysia-family-camp.png'] },
    { id: 'sweden', country: 'Sweden', note: 'Details to be announced.' },
  ],

  events: [
    {
      id: 'walk-for-peace', title: 'Walk for Peace', kicker: 'Community walk',
      date: 'Sunday 15 November', place: 'New York City', crop: 'watermark',
      text: 'A walk through the city in the spirit of peace. Write to us for the meeting point.',
    },
    {
      id: 'online-meditation-centre', title: 'Online Meditation Centre', kicker: 'Every weekend, online',
      date: 'Saturdays & Sundays', time: '07:00 CET · 06:00 UK', place: 'Online', duration: '1.5–2 hours',
      text: 'Weekend meditation you can join from anywhere, Europe-friendly hours. Join through the WhatsApp group on the poster, or write to us.',
      themes: ['Emotion management', 'Loving-kindness meditation', 'Relaxation and healing', 'Nourishing body and mind'],
      image: '2024/04/4-1.png', fit: 'contain',
    },
  ],

  /** Read from the posters in the homepage slider (wp-content/uploads/2026/10). */
  alsoEvents: [
    { id: 'dawn-1', title: 'The Dawn I', kicker: 'Retreat · 憬醒 I', date: '27–30 November 2026', place: 'Vancouver, Canada',
      text: 'Delve deep into the dance of self and world. Touch the soul, reshape life.', image: '2026/10/微信图片_2026-10-20_173844_916-scaled.png' },
    { id: 'journey-11', title: 'Journey to Mindfulness', kicker: 'Retreat · 11th edition', date: '16–20 December 2026', place: 'Los Angeles, United States',
      text: 'Follow the wisdom of the sages, and rediscover your original aspiration.', image: '2026/10/微信图片_2026-10-20_175047_944-scaled.png' },
    { id: 'awakening-2', title: 'Awakening 2', kicker: 'Retreat · 憬醒 2', date: '30 December 2026 – 4 January 2027', place: 'Vancouver, Canada',
      text: 'The second stage of the Dawn programme.', image: '2026/10/微信图片_2026-10-20_173856_361.png' },
    { id: 'bodhi-class', title: 'Bodhi Class', kicker: 'Course · tuition-free', date: 'Ongoing', place: 'Zoom · Vancouver, Toronto, Calgary, Los Angeles, New York, Seattle, North Carolina',
      text: 'Systematic study with flexible timing, personal guidance, group practice and practice in daily life.', image: '2026/10/微信图片_2026-10-20_182225_695.png' },
  ],

  pastEvents: [
    { id: 'journey-2026', title: 'Journey to Mindfulness', kicker: 'Retreat · Canada', date: '29 January – 2 February 2026', place: 'Calgary, Canada',
      text: 'Five days on the Analects, the Book of Changes and meditation. Tuition-free; the venue was sponsored by alumni.', image: '2024/09/Journey-正方形.jpg' },
    { id: 'thailand-2024', title: 'Activities in Thailand', kicker: 'Retreats · 2024', date: '2024', place: 'Thailand', text: 'Recent retreats and gatherings in Thailand.', image: '2024/07/recent-activities-in-Thailand-2024.png' },
    { id: 'malaysia-camp', title: 'Family camp', kicker: 'Malaysia', date: 'Past event', place: 'Malaysia', text: 'A family camp for parents and children.', image: '2024/04/malaysia-family-camp.png' },
  ],

  volunteerRoles: [
    { title: 'Dubber', tags: 'Audiobooks · Videos', images: ['2022/08/dubbing-900.jpg', '2022/08/dubbing-900-3.jpg'],
      text: ['We are adding English voices to dharma videos, meditations and books — Happiness and Freedom, the wisdom quotes of Venerable Renze, the Four Seals and the meditation guidance among them.'] },
    { title: 'Editor', tags: 'Books · Videos · Documents', images: ['2022/08/editor-900-2.jpg', '2022/08/editor-900-1.jpg'],
      text: ['Thousands of books, videos and documents are waiting for editors who write good English and have taken a few basic classes with us.'] },
    { title: 'Translator', tags: 'Chinese → English', images: ['2022/08/translate-900-1.jpg', '2022/08/translate-900-2.jpg'],
      text: ['Every book and video of Master Renze’s teaching in English was translated and edited by volunteers around the world. We are looking for people fluent in both English and Chinese, ready to grow and willing to help.'] },
    { title: 'Coordinator', tags: 'Events · Retreats · Community', images: ['2022/08/coordinate-900-4.jpg', '2022/08/coordinate-900-3.jpg'],
      text: ['Online classes, local retreats and events run all year. We need good communicators who enjoy meditation, Tai Chi and the Dharma.'] },
  ],

  commitments: [
    { title: 'Oneness · Peace', image: '2024/08/peace-.jpg', text: [
      'For thousands of years sages have reminded us that no one is truly separate. “You are not a drop in the ocean; you are the entire ocean in a drop,” wrote Rumi. Zhuangzi said: “Heaven, earth and I were born together; the myriad things and I are one.”',
      'People of every country and colour are like the hands and feet of one body. Every life is precious, so in daily meditation we keep sending prayers of peace into the world. Every project of the foundation rests on peace.',
    ] },
    { title: 'Environment · Balance', image: '2024/08/oneness-2.jpg', text: [
      'No one can live apart from the environment. Two and a half thousand years ago the Buddha already asked monks not to cut trees or even a blade of grass, and to save water.',
      'Protecting nature is a form of compassion. When we return to simplicity and cherish everything, the cycle of trees and climate, soil and animals changes too; a balanced world helps awaken the mind and purify the heart.',
    ] },
    { title: 'Enlightenment · Truth', image: '2024/08/oneness-4.png', text: [
      'Buddha is not a deity; the word means “an enlightened one”, and anyone who awakens may attain Buddhahood. Buddhism is not exclusive: whatever you do, so long as you are learning the truth, you are in accord with it.',
      'A wise, gentle and peaceful mind is like a bright mirror, unchanged by what it reflects: sharp, carefree, observing like a scientist observing nature.',
    ] },
  ],

  qualities: ['Enlightenment', 'Altruism and selflessness', 'The immeasurable', 'Equality', 'Emptiness of self, asking nothing in return'],

  path: [
    { title: 'Learning', text: 'Through studying the truth you will know what to practise and what to avoid.', image: '2024/08/Learning.jpg' },
    { title: 'Reflecting', text: 'Think it through, again and again, to verify and strengthen your awareness of truth, until the method is woven into daily life.', image: '2024/08/Reflecting.jpg' },
    { title: 'Practising', text: 'Progress step by step — giving, volunteering, sharing, meditation — cultivating moral conduct, mental discipline and wisdom.', image: '2024/08/Practicing.jpg' },
  ],

  teachers: [
    { name: 'Venerable Zhenjue', photo: '2022/07/zhenjue-shifu-photo-5.png', bio: [
      'Venerable Zhenjue learnt from Venerable Master Renze; the teaching integrates Tibetan and Chinese Buddhism on the stages of the path to enlightenment.',
      'After years of practice, Venerable Zhenjue saw that disasters, disease, a chaotic world and every kind of suffering come from wrong views and ignorance of the truth. That compassion drives the work of passing on wisdom, and the way to know the truth, to more people.',
    ] },
    { name: 'Venerable Deyang', photo: '2026/01/WechatIMG3426.jpg', bio: [
      'Venerable Deyang was ordained under the guidance of Venerable Renze. The compassionate guidance of virtuous teachers awakened in him a sincere aspiration for the path and a resolve towards liberation.',
      'He chose monastic life not only for his own liberation but with the vow to benefit beings: to uphold pure precepts, cultivate concentration and wisdom, spread the Dharma and relieve suffering, so that the true Dharma may long remain in the world.',
    ] },
  ],

  stats: [
    { value: '100+', label: 'dharma talks a year' },
    { value: '324+', label: 'group classes a year' },
    { value: '365', label: 'daily classes a year' },
    { value: '54+', label: 'retreats a year' },
  ],

  schedule: [
    { time: '06:00', what: 'Prostration & meditation' },
    { time: '08:45', what: 'Morning class' },
    { time: '14:30', what: 'Afternoon class' },
    { time: '17:00', what: 'Prostration' },
    { time: '19:00', what: 'Evening class' },
  ],

  retreatPractices: ['Prayers', 'Breathing exercise', 'Dharma study', 'Meditation guidance', 'Tai Chi', 'Lotus movements'],

  precepts: {
    five: ['To abstain from killing any being', 'To abstain from stealing', 'To abstain from all sexual activity', 'To abstain from telling lies', 'To abstain from all intoxicants'],
    three: ['To abstain from eating after midday', 'To abstain from sensual entertainment and bodily decoration', 'To abstain from high or luxurious beds'],
    note: 'Students who have completed a retreat with the foundation also keep the three additional precepts. The teacher may excuse the sixth for health reasons.',
  },

  retreatRules: [
    { title: 'Trust in the teacher and the technique', text: 'Follow the teacher’s guidance fully for the length of the course, neither ignoring nor adding to it — with understanding, not blind submission.' },
    { title: 'Men and women', text: 'Men and women are kept separate; couples, friends and family do not contact each other during the course.' },
    { title: 'Health', text: 'Follow your doctor’s advice if you have heart or other disease. People with infectious diseases cannot attend.' },
    { title: 'No intoxicants', text: 'No drugs, alcohol, tobacco or sedatives on site. Tell the teacher about any prescribed medicine.' },
    { title: 'Food', text: 'Simple, balanced vegetarian meals are provided. Tell us about any medically prescribed diet when you apply.' },
    { title: 'Simplicity', text: 'Simple, modest clothing. Laundry in the breaks. No phones in class, and silence through the retreat.' },
  ],

  community: [
    { title: 'Mindfulness retreats', image: '2024/07/mindfulness-retreats.jpg', text: [
      'Step away from the busyness of life and immerse yourself in practice in a peaceful natural setting. Guided meditation, yoga, silent periods and reflection help reduce stress, balance emotion and deepen self-awareness — for newcomers and experienced practitioners alike.',
    ], links: [{ label: 'Past events on YouTube', href: YT + 'PLp-bkW_-IYjNlppT0ucOQAd-ISRkoK9qN' }] },
    { title: 'Tai Chi in Richmond', image: '2026/03/tai-chi-2026.jpg', text: [
      'A slow, gentle exercise that builds strength, flexibility and balance, improves circulation and immunity, and eases stress. Two free classes every Friday, morning and afternoon.',
    ], links: [{ label: 'Tai Chi events on YouTube', href: YT + 'PLp-bkW_-IYjM8VZ8I-Kwi8f9N76upieCI' }] },
    { title: 'Hospice care education', image: '2024/07/hospice-care-education.jpg', text: [
      'Palliative care relieves pain, supports patients and families emotionally, respects the wishes and dignity of the dying, eases the burden on family, and cares for body, heart and mind together. Buddhism brings its own deep approach to the end of life.',
    ], links: [] },
  ],

  onlineClasses: [
    { title: 'Morning classes', image: '2022/07/900-124.jpg', goal: 'Start the day with a healthy body and a peaceful mind.', content: ['Morning prayers', 'Prostration practice', 'Repentance', 'Meditation guidance'], times: ['06:00–07:30 MST, daily'] },
    { title: 'Chanting classes', image: '2022/08/900-89.jpg', goal: 'Settle into a peaceful mind in the late afternoon.', content: ['The Mantra of Light', 'Vajrasattva Mantra', 'The Great Compassion Mantra', 'Om Mani Padme Hum'], times: ['17:00–18:00 MST'] },
    { title: 'Dharma classes', image: '2022/08/900-37.jpg', goal: 'Find peace and balance by studying the truth.', content: ['All compounded things are impermanent', 'All contaminated things are suffering', 'All phenomena are empty, devoid of self', 'Nirvana is true peace'], times: ['Tue 20:00–21:00 MST (English)', 'Fri 18:00–20:00 MST (Mandarin)'] },
  ],

  connections: [
    { place: 'Australia', cities: 'Sydney' },
    { place: 'United States', cities: 'Los Angeles · Raleigh · New York' },
    { place: 'Thailand', cities: 'Bangkok · Chiang Mai · Phuket' },
    { place: 'Japan', cities: 'Nara' },
    { place: 'Malaysia', cities: 'Kuala Lumpur · Malacca' },
    { place: 'Singapore' },
    { place: 'South Korea' },
    { place: 'Taiwan, China' },
  ],

  wisdomCollections: [
    { title: 'Bodhicitta', image: '2024/04/wisdom-words-bodhi-citta-1.png' },
    { title: 'On emptiness', image: '2024/04/Wisdom-Words-about-emptiness.png' },
    { title: 'A happy life', image: '2024/04/Wisdom-Words-about-happy-life.png' },
    { title: 'The Tibetan Book of Living and Dying', image: '2024/04/Wisdom-Words-Tibetan.png' },
  ],
};
