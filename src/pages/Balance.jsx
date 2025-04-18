import { useConfig } from '../hooks/useConfig';
import { DataProvider } from '../context/DataContext';
import { useDataContext } from '../hooks/useDataContext';

import CustomContainer from '../components/CustomContainer';
import ContentWrapper from '../components/ContentWrapper';
import LoadingIcon from '../components/LoadingIcon';
import BalanceReport from '../components/Balance/BalanceReport';

const Balance = () => {
  const { config, configLoading } = useConfig();

  if (configLoading || !config) return <p className="text-center my-5"><LoadingIcon /></p>;

  const reqConfig = {
    baseUrl: config.apiConfig.baseUrl + "/v1/balance/with-totals"
  };

  return (
    <DataProvider config={reqConfig}>
      <BalanceContent />
    </DataProvider>
  );
};

const BalanceContent = () => {
  const { data, dataLoading, dataError } = useDataContext();

  if (dataLoading) return <p className="text-center my-5"><LoadingIcon /></p>;
  if (dataError) return <p className="text-danger text-center my-5">{dataError}</p>;
  if (!data || !data.id) return <p className="text-center my-5">No se encontró el balance.</p>;

  return (
    <CustomContainer>
      <ContentWrapper>
        <h1 className="section-title">Resumen del Balance</h1>
        <hr className="section-divider" />
        <BalanceReport balance={data} />
      </ContentWrapper>
    </CustomContainer>
  );
};

export default Balance;
