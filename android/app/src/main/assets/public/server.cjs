var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_app = require("firebase-admin/app");
var import_firestore = require("firebase-admin/firestore");
var import_auth = require("firebase-admin/auth");
try {
  (0, import_app.initializeApp)();
} catch (e) {
  console.error("Firebase Admin Initialization Error", e);
}
var db = (0, import_firestore.getFirestore)();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split("Bearer ")[1];
    try {
      const decodedUser = await (0, import_auth.getAuth)().verifyIdToken(token);
      req.user = decodedUser;
      next();
    } catch (e) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
  const requireAdmin = async (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    if (user.email === "shahroz.mughal.31@gmail.com") {
      return next();
    }
    const adminDoc = await db.collection("admins").doc(user.uid).get();
    if (adminDoc.exists) {
      return next();
    }
    res.status(403).json({ error: "Forbidden: Super Admin access required" });
  };
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  app.post("/api/economy/match-result", requireAuth, async (req, res) => {
    const user = req.user;
    const { scoreGained, merges, highestTile, combo, timeSpent } = req.body;
    if (scoreGained > 1e6 || merges > 1e4) {
      await db.collection("audit_logs").add({
        type: "SUSPICIOUS_MATCH",
        userId: user.uid,
        payload: req.body,
        timestamp: import_firestore.FieldValue.serverTimestamp()
      });
      return res.status(400).json({ error: "Suspicious activity detected" });
    }
    const economyRef = db.collection(`users/${user.uid}/private`).doc("economy");
    const statsRef = db.collection(`users/${user.uid}/private`).doc("stats");
    try {
      await db.runTransaction(async (t) => {
        const economyDoc = await t.get(economyRef);
        const statsDoc = await t.get(statsRef);
        const earnedCoins = Math.floor(scoreGained / 10);
        const earnedXp = scoreGained;
        if (!economyDoc.exists) {
          t.set(economyRef, {
            coins: earnedCoins,
            gems: 0,
            energy: 50,
            premiumTokens: 0,
            level: 1,
            xp: earnedXp,
            streak: 1,
            vipLevel: 0,
            updatedAt: import_firestore.FieldValue.serverTimestamp(),
            unlockedThemes: ["classic"]
          });
        } else {
          t.update(economyRef, {
            coins: import_firestore.FieldValue.increment(earnedCoins),
            xp: import_firestore.FieldValue.increment(earnedXp),
            updatedAt: import_firestore.FieldValue.serverTimestamp()
          });
        }
        if (!statsDoc.exists) {
          t.set(statsRef, {
            totalMerges: merges,
            highestTile,
            bombsUsed: 0,
            totalScore: scoreGained,
            matchesPlayed: 1,
            bossesDefeated: 0,
            updatedAt: import_firestore.FieldValue.serverTimestamp()
          });
        } else {
          const currentStats = statsDoc.data() || {};
          t.update(statsRef, {
            totalMerges: import_firestore.FieldValue.increment(merges),
            highestTile: Math.max(currentStats.highestTile || 0, highestTile),
            totalScore: import_firestore.FieldValue.increment(scoreGained),
            matchesPlayed: import_firestore.FieldValue.increment(1),
            updatedAt: import_firestore.FieldValue.serverTimestamp()
          });
        }
      });
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  app.post("/api/economy/transaction", requireAuth, async (req, res) => {
    const user = req.user;
    const { action, currency, amount, source } = req.body;
    if (!["ADD", "SPEND"].includes(action) || !["coins", "gems", "xp", "vipXp", "premiumTokens", "energy"].includes(currency) || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ error: "Invalid transaction payload format" });
    }
    if (action === "ADD" && amount > 5e4) {
      await db.collection("audit_logs").add({
        type: "SUSPICIOUS_TRANSACTION",
        userId: user.uid,
        payload: req.body,
        timestamp: import_firestore.FieldValue.serverTimestamp()
      });
      return res.status(400).json({ error: "Reward amount exceeds maximum allowed limits. Request logged for review." });
    }
    if (action === "ADD" && source === "daily_reward" && amount > 1e4) {
      return res.status(400).json({ error: "Limit exceeded" });
    }
    const economyRef = db.collection(`users/${user.uid}/private`).doc("economy");
    try {
      await db.runTransaction(async (t) => {
        const economyDoc = await t.get(economyRef);
        const data = economyDoc.data() || { coins: 0, gems: 0, xp: 0, premiumTokens: 0, energy: 0 };
        let newAmount = data[currency] || 0;
        if (action === "ADD") {
          newAmount += amount;
        } else if (action === "SPEND") {
          if (newAmount < amount) {
            throw new Error(`Not enough ${currency}`);
          }
          newAmount -= amount;
        }
        if (!economyDoc.exists) {
          const freshData = { coins: 0, gems: 0, energy: 50, premiumTokens: 0, level: 1, xp: 0, streak: 1, vipLevel: 0, unlockedThemes: ["classic"], updatedAt: import_firestore.FieldValue.serverTimestamp() };
          freshData[currency] = newAmount;
          t.set(economyRef, freshData);
        } else {
          t.update(economyRef, {
            [currency]: newAmount,
            updatedAt: import_firestore.FieldValue.serverTimestamp()
          });
        }
        t.set(db.collection("audit_logs").doc(), {
          type: "ECONOMY_TRANSACTION",
          userId: user.uid,
          action,
          currency,
          amount,
          source,
          timestamp: import_firestore.FieldValue.serverTimestamp()
        });
      });
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  app.post("/api/leaderboard/post", requireAuth, async (req, res) => {
    const user = req.user;
    const { score, mode = "global", displayName = "Anonymous", level = 1 } = req.body;
    if (typeof score !== "number" || score < 0) {
      return res.status(400).json({ error: "Invalid score" });
    }
    try {
      const scoreRef = db.collection(`leaderboards/${mode}/scores`).doc(user.uid);
      await db.runTransaction(async (t) => {
        const doc = await t.get(scoreRef);
        if (!doc.exists || doc.data()?.score < score) {
          t.set(scoreRef, {
            score,
            userId: user.uid,
            displayName,
            level,
            updatedAt: import_firestore.FieldValue.serverTimestamp()
          });
        }
      });
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  app.post("/api/economy/daily-reward", requireAuth, async (req, res) => {
    const user = req.user;
    try {
      const economyRef = db.collection(`users/${user.uid}/private`).doc("economy");
      const result = await db.runTransaction(async (t) => {
        const economyDoc = await t.get(economyRef);
        let data = economyDoc.data() || { coins: 0, gems: 0, xp: 0, premiumTokens: 0, energy: 50, streak: 1 };
        const now = Date.now();
        const lastClaim = data.dailyRewardClaimedAt || 0;
        if (lastClaim > 0) {
          const claimedDate = new Date(lastClaim).toDateString();
          const today = new Date(now).toDateString();
          if (claimedDate === today) {
            throw new Error("Already claimed today");
          }
        }
        const rewardAmount = 500 + data.streak * 50;
        t.update(economyRef, {
          coins: import_firestore.FieldValue.increment(rewardAmount),
          dailyRewardClaimedAt: now,
          updatedAt: import_firestore.FieldValue.serverTimestamp()
        });
        t.set(db.collection("audit_logs").doc(), {
          type: "ECONOMY_TRANSACTION",
          userId: user.uid,
          action: "ADD",
          currency: "coins",
          amount: rewardAmount,
          source: "daily_reward",
          timestamp: import_firestore.FieldValue.serverTimestamp()
        });
        return { amount: rewardAmount, currency: "coins" };
      });
      res.json({ success: true, reward: result });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });
  app.post("/api/economy/mission-reward", requireAuth, async (req, res) => {
    const user = req.user;
    const { missionId, rewardType, rewardAmount } = req.body;
    if (!missionId || !rewardType || !rewardAmount) {
      return res.status(400).json({ error: "Missing payload" });
    }
    try {
      const economyRef = db.collection(`users/${user.uid}/private`).doc("economy");
      const missionRef = db.collection(`users/${user.uid}/private`).doc("missions");
      await db.runTransaction(async (t) => {
        const missionDoc = await t.get(missionRef);
        const claimedMissions = missionDoc.data()?.claimed || [];
        if (claimedMissions.includes(missionId)) {
          throw new Error("Mission already claimed");
        }
        claimedMissions.push(missionId);
        t.set(missionRef, { claimed: claimedMissions }, { merge: true });
        const economyDoc = await t.get(economyRef);
        if (!economyDoc.exists) {
          const freshData = { coins: 0, gems: 0, energy: 50, premiumTokens: 0, level: 1, xp: 0, streak: 1, vipLevel: 0, updatedAt: import_firestore.FieldValue.serverTimestamp() };
          freshData[rewardType] = rewardAmount;
          t.set(economyRef, freshData);
        } else {
          t.update(economyRef, {
            [rewardType]: import_firestore.FieldValue.increment(rewardAmount),
            updatedAt: import_firestore.FieldValue.serverTimestamp()
          });
        }
        t.set(db.collection("audit_logs").doc(), {
          type: "ECONOMY_TRANSACTION",
          userId: user.uid,
          action: "ADD",
          currency: rewardType,
          amount: rewardAmount,
          source: `mission_${missionId}`,
          timestamp: import_firestore.FieldValue.serverTimestamp()
        });
      });
      res.json({ success: true });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });
  app.post("/api/economy/lucky-spin", requireAuth, async (req, res) => {
    const user = req.user;
    try {
      const economyRef = db.collection(`users/${user.uid}/private`).doc("economy");
      const result = await db.runTransaction(async (t) => {
        const economyDoc = await t.get(economyRef);
        let data = economyDoc.data() || { coins: 0, luckySpinsAvailable: 0, luckySpinUsedAt: 0 };
        const now = Date.now();
        const canFree = !data.luckySpinUsedAt || now - data.luckySpinUsedAt > 864e5;
        if (!canFree && (data.luckySpinsAvailable || 0) <= 0) {
          throw new Error("No spins available");
        }
        let updates = { updatedAt: import_firestore.FieldValue.serverTimestamp() };
        if (canFree) {
          updates.luckySpinUsedAt = now;
        } else {
          updates.luckySpinsAvailable = import_firestore.FieldValue.increment(-1);
        }
        const randomStr = Math.random();
        let reward = { type: "coins", amount: 100, label: "100 Coins" };
        if (randomStr > 0.9) reward = { type: "gems", amount: 10, label: "10 Gems" };
        else if (randomStr > 0.7) reward = { type: "coins", amount: 500, label: "500 Coins" };
        updates[reward.type] = import_firestore.FieldValue.increment(reward.amount);
        t.update(economyRef, updates);
        t.set(db.collection("audit_logs").doc(), {
          type: "ECONOMY_TRANSACTION",
          userId: user.uid,
          action: "ADD",
          currency: reward.type,
          amount: reward.amount,
          source: "lucky_spin",
          timestamp: import_firestore.FieldValue.serverTimestamp()
        });
        return reward;
      });
      res.json({ success: true, reward: result });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });
  app.post("/api/economy/shop-purchase", requireAuth, async (req, res) => {
    const user = req.user;
    const { itemId, costCurrency, costAmount, rewardCurrency, rewardAmount } = req.body;
    if (!costCurrency || !costAmount) {
      return res.status(400).json({ error: "Missing payload" });
    }
    try {
      const economyRef = db.collection(`users/${user.uid}/private`).doc("economy");
      await db.runTransaction(async (t) => {
        const economyDoc = await t.get(economyRef);
        let data = economyDoc.data() || { coins: 0, gems: 0 };
        if ((data[costCurrency] || 0) < costAmount) {
          throw new Error(`Not enough ${costCurrency}`);
        }
        let updates = {
          [costCurrency]: import_firestore.FieldValue.increment(-costAmount),
          updatedAt: import_firestore.FieldValue.serverTimestamp()
        };
        if (rewardCurrency && rewardAmount) {
          updates[rewardCurrency] = import_firestore.FieldValue.increment(rewardAmount);
        }
        t.update(economyRef, updates);
        t.set(db.collection("audit_logs").doc(), {
          type: "SHOP_PURCHASE",
          userId: user.uid,
          itemId,
          costCurrency,
          costAmount,
          timestamp: import_firestore.FieldValue.serverTimestamp()
        });
      });
      res.json({ success: true });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });
  app.get("/api/admin/logs", requireAuth, requireAdmin, async (req, res) => {
    try {
      const logs = await db.collection("audit_logs").orderBy("timestamp", "desc").limit(50).get();
      res.json(logs.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  app.get(["/privacy", "/privacy.html"], (req, res) => {
    res.sendFile(import_path.default.join(process.cwd(), "public", "privacy.html"));
  });
  app.get(["/terms", "/terms.html"], (req, res) => {
    res.sendFile(import_path.default.join(process.cwd(), "public", "terms.html"));
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
