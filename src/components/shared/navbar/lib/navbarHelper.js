import { toCapitalize, toCapitalizeEachWord } from '@/helpers/Text';

const getTitleNavbar = (value) => {
  switch (value) {
    case 'skema':
      return 'Daftar Skema';

    case 'sertifikat':
      return 'Daftar Sertifikat';

    case 'pengaturan':
      return 'Pengaturan Profil';

    case 'sertifikat-baru':
      return 'Buat Sertifikat Baru';

    default:
      return toCapitalizeEachWord(value.replace('-', ' '));
  }
};
export { getTitleNavbar };
