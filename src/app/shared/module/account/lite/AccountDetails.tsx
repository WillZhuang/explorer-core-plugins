import * as React from "react";
import { Label } from "@alethio/ui/lib/data/Label";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { AccountTypeBox } from "@alethio/explorer-ui/lib/box/account/AccountTypeBox";
import { AccountType } from "app/shared/data/account/AccountType";
import { ITranslation } from "plugin-api/ITranslation";
import { ILogger } from "plugin-api/ILogger";
import { IAsyncData } from "plugin-api/IAsyncData";
import { BigNumber } from "app/util/BigNumber";
import { IAccountDetails } from "app/eth-lite/data/account/IAccountDetails";
// import { EthValueBox } from "@alethio/ui/lib/data/box/EthValueBox";
import { NotAvailableBox } from "app/shared/component/NotAvailableBox";
// import { QrCodeBox } from "@alethio/explorer-ui/lib/qrCode/QrCodeBox";
import { observer } from "mobx-react";

export interface IAccountDetailsProps {
    accountHash: string;
    accountDetails: IAccountDetails;
    accountBalance: IAsyncData<BigNumber> | undefined;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    logger: ILogger;
}

@observer
export class AccountDetails extends React.Component<IAccountDetailsProps> {
    render() {
        // let { translation: tr, accountDetails: account, locale, accountBalance: balance, ethSymbol } = this.props;
        let { translation: tr, accountDetails: account,  accountBalance: balance } = this.props;
        return <>
            <LayoutRow minWidth={660}>
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.accountHash.label")}</Label>
                    <AddressHashBox noLink>
                        {this.props.accountHash}
                    </AddressHashBox>
                </LayoutRowItem>
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.accountType.label")}</Label>
                    <AccountTypeBox>{tr.get("accountView.type." + AccountType[account.type])}</AccountTypeBox>
                    {/* <QrCodeBox value={"0x" + this.props.accountHash} logger={this.props.logger} /> */}
                </LayoutRowItem>
            </LayoutRow>
            { balance &&
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.permission.type")}</Label>
                    { balance.isLoaded() ?
                    // <EthValueBox locale={locale} wei={balance.data} symbol={ethSymbol} />
                    <LayoutRowItem>
                    <AccountTypeBox>{ balance.data > new BigNumber( 1 ) ? tr.get("accountView.user.administrator") : tr.get("accountView.user.consumer")}</AccountTypeBox>
                    {/* <EthValueBox locale={locale} wei={balance.data} symbol={ethSymbol} /> */}
                    {/* <Label>{balance.data}</Label> */}
                    <Label>{ "" + balance.data.div(new BigNumber(1000000000000000000)) }</Label>
                    </LayoutRowItem>
                    :
                    <NotAvailableBox translation={tr} /> }
                </LayoutRowItem>
            </LayoutRow> }
        </>;
    }
}
