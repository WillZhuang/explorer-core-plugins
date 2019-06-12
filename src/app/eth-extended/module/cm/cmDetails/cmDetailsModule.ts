import { IModuleDef } from "plugin-api/IModuleDef";
import { ICmDetails } from "app/eth-extended/data/contractMsg/details/ICmDetails";
import { ICmContext } from "../../../context/ICmContext";
import { ICmDetailsProps, CmDetails } from "./component/CmDetails";
import { cmContextType } from "app/shared/context/cmContextType";

enum CmDetailsSlotType {
    Modules = "modules"
}

export const cmDetailsModule: IModuleDef<ICmDetailsProps, ICmContext, CmDetailsSlotType> = {
    contextType: cmContextType,
    slotNames: Object.values(CmDetailsSlotType),

    dataAdapters: [{
        ref: "adapter://aleth.io/cm/details"
    }, {
        ref: "adapter://aleth.io/prices/latest",
        optional: true
    }],

    getContentComponent: async () => CmDetails,

    getContentProps(data) {
        let { asyncData, context, translation, locale, slots } = data;

        let cmDetails = asyncData.get("adapter://aleth.io/cm/details")!.data as ICmDetails;
        let latestEthPrice = asyncData.get("adapter://aleth.io/prices/latest")!.data as number | undefined;

        let props: ICmDetailsProps = {
            txHash: context.txHash,
            txValidationIndex: context.validationIndex,
            cmDetails,
            latestEthPrice,
            locale,
            translation,
            modules: slots && slots[CmDetailsSlotType.Modules]
        };
        return props;
    }
};