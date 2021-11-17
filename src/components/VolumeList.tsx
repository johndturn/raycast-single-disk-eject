import { useState, useEffect } from 'react'
import { List } from '@raycast/api'

import { Volume } from '../types'
import { listVolumes, ejectVolume } from '../utils'
import VolumeListItem from './VolumeListItem'

export default function VolumeList() {
  const [volumes, setVolumes] = useState<Volume[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchVolumes() {
    setIsLoading(true)
    setVolumes(await listVolumes())
    setIsLoading(false)
  }

  async function eject(volume: Volume): Promise<void> {
    setIsLoading(true)
    setVolumes([])

    await ejectVolume(volume)
    await fetchVolumes()
  }

  useEffect(() => {
    fetchVolumes()
  }, [])

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Filter Volumes By Name...">
      {volumes.map(volume => (
        <VolumeListItem key={volume.name} volume={volume} eject={eject} />
      ))}
    </List>
  )
}
