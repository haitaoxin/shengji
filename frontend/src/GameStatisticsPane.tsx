import * as React from 'react';
import {GameStatistics} from './state/GameStatistics';
import styled from 'styled-components';

const Row = styled.div`
  display: table-row;
  line-height: 23px;
`;
const LabelCell = styled.div`
  display: table-cell;
  padding-right: 2em;
  font-weight: bold;
`;
const Cell = styled.div`
  display: table-cell;
`;



const percentage = (numerator: number, denominator: number) => {
  if (denominator > 0) {
    return (numerator/denominator * 100).toFixed(2)+'%';
  }
  return 'n/a';
}

const ranks = (ranks: number, numGames: number) => {
  if (numGames > 0) {
    return (ranks/numGames).toFixed(3);
  }
  return 'n/a';
}

type RowProps = {
  label: string;
  numPlayed: number;
  numWon: number;
}

const GameStatisticsRow = ({label, numPlayed, numWon}: RowProps) => {
  return (
    <Row>
      <LabelCell>{label}</LabelCell>
      <Cell>{numPlayed}</Cell>
      <Cell>{numWon}</Cell>
      <Cell>{percentage(numWon, numPlayed)}</Cell>
    </Row>
  )
}


type Props = {
  gameStatistics: GameStatistics;
};

const GameStatisticsPane = (props: Props) => {
  const {gameStatistics} = props;
  console.log(gameStatistics);

  const gamesPlayedAsAttacking = gameStatistics.gamesPlayed - gameStatistics.gamesPlayedAsDefending;
  const gamesWonAsAttacking = gameStatistics.gamesWon - gameStatistics.gamesWonAsDefending;

  return (
    <div className="gameStatistics">
      <h3>win statistics</h3>
      <div style={{display: 'table'}}>
        <Row>
          <Cell/>
          <LabelCell>played</LabelCell>
          <LabelCell>won</LabelCell>
          <LabelCell>percentage</LabelCell>
        </Row>
        <GameStatisticsRow 
          label={'attacking'}
          numPlayed={gamesPlayedAsAttacking}
          numWon={gamesWonAsAttacking}
        />
        <GameStatisticsRow 
          label={'defending'}
          numPlayed={gameStatistics.gamesPlayedAsDefending}
          numWon={gameStatistics.gamesWonAsDefending}
        />
        <GameStatisticsRow 
          label={'as landlord'}
          numPlayed={gameStatistics.gamesPlayedAsLandlord}
          numWon={gameStatistics.gamesWonAsLandlord}
        />
        <GameStatisticsRow 
          label={'total'}
          numPlayed={gameStatistics.gamesPlayed}
          numWon={gameStatistics.gamesWon}
        />
      </div>
      <h3>rank up statistics</h3>
      <div style={{display: 'table'}}>
        <Row>
          <LabelCell>ranks/game</LabelCell>
          <Cell>{ranks(gameStatistics.ranksUp, gameStatistics.gamesPlayed)}</Cell>
        </Row>
        <Row>
          <LabelCell>ranks/win</LabelCell>
          <Cell>{ranks(gameStatistics.ranksUp, gameStatistics.gamesWon)}</Cell>
        </Row>
      </div>
    </div>
  );
};

export default GameStatisticsPane;
