import React from 'react'
import { ChangeToPublicButton } from './ChangeToPublicButton'
import { ChangeToLocalButton } from './ChangeToLocalButton'
import { MakeListPublicButton } from './MakeListPublicButton'

interface ChangePublicLocalViewProps {
    localList: boolean
    publicListCode: string
    handleChangeLocal: () => void
    handleChangePublic: () => void
    handleConvertToPublic: () => void
}
export const ChangePublicLocalView: React.FC<ChangePublicLocalViewProps> = ({ localList, publicListCode, handleChangeLocal, handleChangePublic, handleConvertToPublic }) => {
    return (
        <div className='flex flex-col items-center gap-3'>
            {localList ? <MakeListPublicButton handleConvertToPublic={handleConvertToPublic} /> : null}
            {localList ?
                <ChangeToPublicButton handleChangePublic={handleChangePublic} publicListCode={publicListCode} />
                :
                <ChangeToLocalButton handleChangeLocal={handleChangeLocal} />
            }
        </div>
    )
}
