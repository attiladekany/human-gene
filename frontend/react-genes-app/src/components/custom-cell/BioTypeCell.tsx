import { Gene } from '@/models/gene.model';
import './BioTypeCell.scss';
import { MRT_Cell } from 'mantine-react-table';
import { ThemeIcon, Text, Group } from '@mantine/core';
import { BioTypeText, getBioTypeColor } from '@/enums/bio-type.map';
import { BioType } from '@/enums/bio-type.enum';

type Props = {
  cell: MRT_Cell<Gene, BioType>;
};

const BioTypeCell = ({ cell }: Props) => {
  const bioTypeCode = cell.getValue<BioType>();
  const color = getBioTypeColor(bioTypeCode);
  const label = BioTypeText[bioTypeCode];

  return (
    <Group align="center" style={{ gap: 8 }}>
      <ThemeIcon
        size={12}
        radius="xl"
        variant="filled"
        aria-hidden
        style={{ backgroundColor: color }}
      />
      <div>{label}</div>
    </Group>
  );
};

export default BioTypeCell;
