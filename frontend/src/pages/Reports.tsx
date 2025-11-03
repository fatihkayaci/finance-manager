
import ReportsHeader from '../components/ReportsHeader';
import ReportsStatsCardContainer from '../components/ReportsStatsCardContainer';
import CategorySummary from '../components/CategorySummary';
import TransactionTable from '../components/TransactionTable';

function Reports() {
  return (
    <>
      <ReportsHeader />
      <ReportsStatsCardContainer />
      <CategorySummary />
      <TransactionTable />
    </>
  );

}

export default Reports;