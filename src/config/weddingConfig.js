import { assets } from './assets';

export const weddingConfig = {
  // ─── Main Banner & Metadata ──────────────────────────────
  blessingHeader: '|| ॐ श्री गणेशाय नमः ||',
  bengaliBlessing: 'শুভ বিবাহ',
  hashtag: '#AyushSatakshi',

  // ─── Couple Info ──────────────────────────────────────────
  groom: {
    firstName: 'Ayush',
    lastName: 'Gudimalla',
    father: 'Mr. Srinivas Gudimalla',
    mother: 'Mrs. Sunitha Gudimalla',
    grandfather: 'Late Mr. Ramulu',
    grandmother: 'Mrs. Guru Bai',
  },
  bride: {
    firstName: 'Satakshi',
    lastName: 'Pathak',
    father: 'Mr. Manoj Kumar Pathak',
    mother: 'Mrs. Bachchi Devi',
    grandfather: 'Mr. Shovakant Pathak',
    grandmother: 'Late Mrs. Prabha Devi',
  },

  // ─── Save The Date Section ────────────────────────────────
  saveTheDate: {
    eyebrow: "Don't miss the celebration",
    title: 'SAVE THE DATE',
    dateText: '5th – 6th July 2026',
    dates: '5th – 6th July 2026',
  },

  // ─── Venue Details ────────────────────────────────────────
  venue: {
    label: 'WHERE WE CELEBRATE',
    name: 'The Grand Palace',
    city: 'Hyderabad',
    fullAddress: 'The Grand Palace, Harshaguda, Hyderabad',
    tagline: 'Where our forever begins.',
    mapsUrl: 'https://maps.google.com/?q=Hyderabad',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.35771847!2d78.24323205!3d17.41260022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin',
  },

  // ─── Events Schedule Section ──────────────────────────────
  eventsScheduleHeader: {
    title: 'EVENTS\nSCHEDULE',
    subtitle: 'CELEBRATE WITH US',
  },

  events: [
    {
      id: 'haldi',
      title: 'HALDI\nCEREMONY',
      hashtag: '#SunMeetsSky',
      joinText: 'PLEASE JOIN US FOR A MORNING',
      tagline: 'Filled with love, laughter and turmeric.',
      date: '5TH JULY 2026',
      time: '10:00 AM',
    },
    {
      id: 'mehndi',
      title: 'MEHNDI\nCEREMONY',
      hashtag: '#MehndiHaiRachneWali',
      joinText: 'PLEASE JOIN US FOR AN AFTERNOON',
      tagline: 'Filled with vibrant hues, joyful moments and the fragrance of henna.',
      date: '5TH JULY 2026',
      time: '2:00 PM',
    },
    {
      id: 'sangeet',
      title: 'SANGEET\nCELEBRATION',
      hashtag: '#YeShaamShandaar',
      joinText: 'PLEASE JOIN US FOR AN EVENING',
      tagline: 'Where melodies meet memories and hearts dance with joy.',
      date: '5TH JULY 2026',
      time: '8:00 PM',
    },
    {
      id: 'wedding',
      title: 'WEDDING\nCEREMONY',
      hashtag: '#AyushSatakshi',
      joinText: 'PLEASE JOIN US FOR A SACRED CELEBRATION',
      tagline: 'As two hearts, two families and two journeys become one.',
      date: '6TH JULY 2026',
      rituals: [
        { name: 'Baraat', time: '6:00 PM' },
        { name: 'Varmala', time: '8:00 PM' },
        { name: 'Rituals', time: '11:00 PM' },
      ],
    },
  ],

  // ─── Wardrobe Guide ───────────────────────────────────────
  wardrobeHeader: 'WARDROBE GUIDE',
  wardrobe: [
    {
      id: 'haldi',
      eventLabel: 'HALDI',
      themeName: 'Sunshine Shades',
      description: 'Think comfortable festive wear in cheerful shades of yellow.',
    },
    {
      id: 'mehndi',
      eventLabel: 'MEHNDI',
      themeName: 'Henna Hues',
      description: 'Think vibrant greens with festive accents inspired by the colors of celebration.',
    },
    {
      id: 'sangeet',
      eventLabel: 'SANGEET',
      themeName: 'Starlit Glam',
      description: 'Think glittery pastels and sophisticated evening wear that sparkles under the lights.',
    },
    {
      id: 'wedding',
      eventLabel: 'WARDROBE',
      themeName: 'Royal Wedding Hues',
      description: 'Think timeless sarees, lehengas, sherwanis, and bandhgalas in regal tones.',
    },
  ],

  // ─── Opening & Cover Invitation Details ───────────────────
  invitation: {
    monogram: 'AS',
    blessing: '|| Om Shree Ganeshaya Namah ||',
    shloka: {
      devanagari:
        'मङ्गलम् भगवान विष्णुः मङ्गलम् गरुडध्वजः ।\nमङ्गलम् पुण्डरी काक्षः मङ्गलाय तनो हरिः ।।',
      roman:
        'MANGALAM BHAGWAN VISHNU · MANGALAM GARUDADHWAJAH\nMANGALAM PUNDARIKAKSHAH · MANGALAYA TANO HARIH',
    },
    inviteText:
      'We request the honor of your gracious presence\non the auspicious occasion of the wedding celebration of',
    dates: '5th – 6th July 2026',
    coverTitle: 'YOU\'RE\nINVITED',
    coverSubtitle: 'Tap the envelope to open our invitation',
    coverTapHint: '✦ Tap to open ✦',
    closingWithLove: 'WITH LOVE',
    assets: assets.opening,
  },
};
