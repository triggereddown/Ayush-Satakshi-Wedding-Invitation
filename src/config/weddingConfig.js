import { assets } from './assets';

export const weddingConfig = {
  // ─── Main Banner & Metadata ──────────────────────────────
  blessingHeader: '|| ॐ श्री गणेशाय नमः ||',
  bengaliBlessing: 'শুভ বিবাহ',
  hashtag: '#AyushWedsSatakshi',

  // ─── Couple Info ──────────────────────────────────────────
  groom: {
    firstName: 'Ayush',
    lastName: 'Mukherjee',
    father: 'Mr. Piyush Mukherjee',
    mother: 'Mrs. Jhuma Mukherjee',
    grandfather: 'Late Mr.P.N. Mukherjee',
    grandmother: 'Late Mrs. Bithi Mukherjee',
  },
  bride: {
    firstName: 'Satakshi',
    lastName: 'Bhattacharjee',
    father: 'Mr. Biplab Bhattacharjee',
    mother: 'Mrs. Chinmoyee Bhattacharjee',
    grandfather: 'Late Mr. Ramendu Kishore Bhattacharjee',
    grandmother: 'Late Mrs. Bijaya Bhattacharjee',
  },

  // ─── Save The Date Section ────────────────────────────────
  saveTheDate: {
    eyebrow: "Don't miss the celebration",
    title: 'SAVE THE DATE',
    dateText: '21st – 23rd November 2026',
    dates: '21 – 23 Nov 2026',
  },

  // ─── Venue Details ────────────────────────────────────────
  venue: {
    label: 'WHERE WE CELEBRATE',
    name: 'Hotel RA Vista',
    city: 'Kolkata',
    fullAddress: 'Dum Dum,Near International Airport Kolkata',
    tagline: 'Where our forever begins.',
    mapsUrl:
      'https://www.google.com/maps/place/Hotel+Ra+Vista/@22.6439183,88.4325539,17z/data=!3m1!4b1!4m9!3m8!1s0x39f89f0044c77801:0x425b27447e9b5506!5m2!4m1!1i2!8m2!3d22.6439183!4d88.4325539!16s%2Fg%2F11vrds143l?entry=ttu',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.493976867375!2d88.4325539!3d22.6439183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89f0044c77801%3A0x425b27447e9b5506!2sHotel%20Ra%20Vista!5e0!3m2!1sen!2sin!4v1726859000000!5m2!1sen!2sin',
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
      date: '21st November 2026',
      time: '10:00 AM',
    },
    {
      id: 'wedding',
      title: 'WEDDING\nCEREMONY',
      hashtag: '#TieTheKnotNov26',
      joinText: 'PLEASE JOIN US FOR AN EVENING',
      tagline: 'Dancing Under the stars, bound forever by Love',
      date: '21st November 2026',
      rituals: [
        { name: 'Baraat', time: '6:00 PM' },
        { name: 'Mala Bodol', time: '7:00 PM' },
        { name: 'Sindoor Daan', time: '8:00 PM' },
      ],
    },
    {
      id: 'sangeet',
      title: 'SANGEET\nCELEBRATION',
      hashtag: '#YeShaamShandaar',
      joinText: 'PLEASE JOIN US FOR AN EVENING',
      tagline: 'Where melodies meet memories and hearts dance with joy.',
      date: '22nd November 2026',
      time: '7:00 PM',
    },
    {
      id: 'reception',
      title: 'RECEPTION\nCEREMONY',
      hashtag: '#CheersToTheNewlyWeds',
      joinText: 'PLEASE JOIN US FOR A GRAND CELEBRATION',
      tagline: "Here's to Love,Laughter and a Night to remember.",
      date: '23rd November 2026',
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
    dates: '21st to 23rd November 2026',
    coverTitle: 'YOU\'RE\nINVITED',
    coverSubtitle: 'Tap the envelope to open our invitation',
    coverTapHint: '✦ Tap to open ✦',
    closingWithLove: 'WITH LOVE',
    assets: assets.opening,
  },
};
