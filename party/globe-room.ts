import type * as Party from "partykit/server";

type Presence = { lat: number; lon: number };

export default class GlobeRoom implements Party.Server {
  presence = new Map<string, Presence>();

  constructor(readonly room: Party.Room) {}

  async onConnect(conn: Party.Connection) {
    const record = (await this.room.storage.get<number>("record")) ?? 0;
    conn.send(JSON.stringify({ type: "welcome", selfId: conn.id, record }));
    conn.send(JSON.stringify({ type: "peers", peers: this.peerList() }));
  }

  async onMessage(message: string, sender: Party.Connection) {
    let data: { type?: string; lat?: number; lon?: number };
    try {
      data = JSON.parse(message);
    } catch {
      return;
    }

    if (data.type === "presence" && typeof data.lat === "number" && typeof data.lon === "number") {
      this.presence.set(sender.id, { lat: data.lat, lon: data.lon });
      this.broadcastPeers();
      await this.maybeUpdateRecord();
    }
  }

  onClose(conn: Party.Connection) {
    this.presence.delete(conn.id);
    this.broadcastPeers();
  }

  onError(conn: Party.Connection) {
    this.presence.delete(conn.id);
    this.broadcastPeers();
  }

  peerList() {
    return [...this.presence.entries()].map(([id, p]) => ({ id, lat: p.lat, lon: p.lon }));
  }

  broadcastPeers() {
    this.room.broadcast(JSON.stringify({ type: "peers", peers: this.peerList() }));
  }

  async maybeUpdateRecord() {
    const count = this.presence.size;
    const record = (await this.room.storage.get<number>("record")) ?? 0;
    if (count > record) {
      await this.room.storage.put("record", count);
      this.room.broadcast(JSON.stringify({ type: "record", record: count }));
    }
  }
}
